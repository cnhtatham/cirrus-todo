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

app.get('/', (req, res) => { // get method
  res.send('Hello World'); // send response
});

// Get request to retrive the full list of tasks
// Specifying response code as 200 to allow for customisation later if needed
app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

// Post request to add new task to db
app.post('/tasks', (req, res) => {
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
// Returns 404 if not task found with requested id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((element) => element.id == req.params.id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send();
  }
});

// Put request to fully update task specified by id url param
// Returns 404 if not task found with requested id
app.put('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex((element) => element.id == req.params.id);
  if (taskIndex >= 0) {
    tasks[taskIndex].title = req.body.title;
    tasks[taskIndex].completed = Boolean(req.body.completed);
    res.status(200).send(tasks[taskIndex]);
  } else {
    res.status(404).send();
  }
});

module.exports = app;
