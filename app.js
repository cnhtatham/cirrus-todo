const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Load in our tasks json file into variable
// This variable will act as the database
const tasks = JSON.parse(fs.readFileSync('tasks.json'));

// id Variable to make sure we have unique id for each task added
let id = tasks.length;

// Function to update task data, will filter out any new properties
// and do a datatype converstion when needed
const updateData = (task, updates) => {
  const updatedTask = task;
  Object.entries(updates).forEach(([key, value]) => {
    if (key in task) {
      if (key === 'completed') {
        updatedTask[key] = value === 'true';
      } else {
        updatedTask[key] = value;
      }
    }
  });
  return updatedTask;
};

app.get('/', (req, res) => { // get method
  console.log('GET / request received')
  res.send('Hello World'); // send response
});

// Get request to retrive the full list of tasks
// Specifying response code as 200 to allow for customisation later if needed
app.get('/tasks', (req, res) => {
  console.log('GET /tasks request received')
  res.status(200).send(tasks);
});

// Post request to add new task to db
app.post('/tasks', (req, res) => {
  console.log('POST /tasks request received')
  id += 1;
  const newTask = {
    id,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).send(newTask);
});

// Get request to return specific task specified by the ID in request parameters
// Returns 404 if no task found with requested id
app.get('/tasks/:id', (req, res) => {
  console('GET /tasks/:id request received')
  const task = tasks.find((element) => String(element.id) === req.params.id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send(`No task found with id ${req.params.id}`);
  }
});

// Put request to fully update task specified by id url param
// Returns 404 if no task found with requested id
app.put('/tasks/:id', (req, res) => {
  console.log('PUT /tasks/:id request received')
  const taskIndex = tasks.findIndex((element) => String(element.id) === req.params.id);
  if (taskIndex >= 0) {
    tasks[taskIndex] = updateData(tasks[taskIndex], req.body);
    res.status(200).send(tasks[taskIndex]);
  } else {
    res.status(404).send(`No task found with id ${req.params.id}`);
  }
});

// Patch request to allow partial update of task specified by id url param
// Returns 404 if no task found with requested id
app.patch('/tasks/:id', (req, res) => {
  console.log('PATCH /tasks/:id request received')
  const taskIndex = tasks.findIndex((element) => String(element.id) === req.params.id);
  if (taskIndex >= 0) {
    tasks[taskIndex] = updateData(tasks[taskIndex], req.body);
    res.status(200).send(tasks[taskIndex]);
  } else {
    res.status(404).send(`No task found with id ${req.params.id}`);
  }
});

module.exports = app;
