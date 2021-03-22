const express = require('express');
const fs = require('fs');

const app = express();

// Load in our tasks json file into variable
// This variable will act as the database
const tasks = JSON.parse(fs.readFileSync('tasks.json'));

app.get('/', (req, res) => { // get method
  res.send('Hello World'); // send response
});

// Get request to retrive the full list of tasks
// Specifying response code as 200 to allow for customisation later if needed
app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

module.exports = app;
