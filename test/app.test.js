const request = require('supertest');
const app = require('../app');



describe('GET /', () => {
  // Test base root for 200 response code
  test('It should respond with a string: "Hello World"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /tasks', () => {
  // Test get all tasks route. Should respond with default tasks in tasks.json
  test('It should respond with an array of tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.body).toEqual(
      [{
        id: 1,
        title: 'Buy groceries',
        completed: false
      },
      {
        id: 2,
        title: 'Do laundry',
        completed: true
      }
      ]
    );
    expect(response.statusCode).toBe(200);
  });
});


describe('GET /tasks/:id', () => {
  // Test for response to GET request for specific task
  test('It should respond with a single task with id : 1', async () => {
    const response = await request(app).get('/tasks/1');

    // As no Changes have happened, should repond with base task in task.json with id = i
    expect(response.body).toEqual(
      {
        id: 1,
        title: 'Buy groceries',
        completed: false
      }
    );
    expect(response.statusCode).toBe(200);
  });

  // Test to see if requesting task that doesn't exist returns a 404
  test('It should respond with a 404 status code', async () => {
    const response = await request(app).get('/tasks/0');
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /tasks', () => {
  // Test for response to POST request, creating a brand new task
  test('It should respond with new task object that has been inserted into DB', async () => {
    const response1 = await request(app)
      .post('/tasks')
      .type('form')
      .send({
        title: 'Brush Teeth',
      });


    // Check response has correct fields and corresponding values
    expect(response1.body).toHaveProperty('id');
    expect(response1.body.title).toBe('Brush Teeth');
    expect(response1.body.completed).toBe(false);
    expect(response1.statusCode).toBe(201);

    // Make sure we have 3 tasks now
    const response2 = await request(app).get('/tasks');
    expect(response2.body.length).toBe(3);
    expect(response2.statusCode).toBe(200);

    // Make sure we can GET new task using the id in the response 
    // and field values are the same as task returned in initial POST request
    const response3 = await request(app).get(`/tasks/${response1.body.id}`);
    expect(response3.body.id).toBe(response1.body.id);
    expect(response3.body.title).toBe(response1.body.title);
    expect(response3.body.completed).toBe(response1.body.completed);
    expect(response3.statusCode).toBe(200);
  });
});

describe('PUT /tasks/:id', () => {
    // Test response to PUT request
    test('It should respond with a single task with id : 1 and updated fields', async () => {
      const response1 = await request(app)
      .put('/tasks/1')
      .type('form')
      .send({
          completed : true,
          title : 'Buy Groceries'
      });

      // Should repsond with task updated in all fields
      expect(response1.body).toEqual(
        {
          id: 1,
          title: 'Buy Groceries',
          completed: true,
        },
      );
      expect(response1.statusCode).toBe(200);

      // Test to see if change has been written to database.
      // Should respond with exact same task as PUT request with 200 status code.
      const response2 = await request(app).get('/tasks/1');
      expect(response2.body).toEqual(
        {
          id: 1,
          title: 'Buy Groceries',
          completed: true
        }
      )
      expect(response2.statusCode).toBe(200);
    });
  
    // Test response to PUT request when including fields that are not in database
    test('It should respond with a single task with id : 2 and updated with new fields filtered out', async () => {
      const response1 = await request(app)
      .put('/tasks/2')
      .type('form')
      .send({
          completed : true,
          title : 'Brush Teeth',
          due: 'tomorrow'
      });

      // Should respond with fully updated task and due field discarded
      expect(response1.body).toEqual(
        {
          id: 2,
          title: 'Brush Teeth',
          completed: true
        }
      );
      expect(response1.statusCode).toBe(200);

      // Test to see if change has been written to database.
      // Should respond with exact same task as PUT request with 200 status code.
      const response2 = await request(app).get('/tasks/2');
      expect(response2.body).toEqual(
        {
          id: 2,
          title: 'Brush Teeth',
          completed: true
        }
      )
      expect(response2.statusCode).toBe(200);
    });
    
    // Test to see if correct 404 response code if trying to update task that does not exist
    test('It should respond with a 404 status code', async () => {
      const response = await request(app)
      .put('/tasks/0')
      .type('form')
      .send({
          completed : true,
          title : 'Brush Teeth'
      });
      expect(response.statusCode).toBe(404);
    });
  });


  describe('Patch /tasks/:id', () => {
    // Test response to Patch request updating 'completed' field.
    test('It should respond with a single task with id : 1 and updated fields', async () => {
      const response1 = await request(app)
      .patch('/tasks/1')
      .type('form')
      .send({
          completed : false,
      });

      // Should respond with Task updated in all fields and 200 status code.
      expect(response1.body).toEqual(
        {
          id: 1,
          title: 'Buy Groceries',
          completed: false
        }
      );
      expect(response1.statusCode).toBe(200);

      // Test to see if change has been written to database.
      // Should respond with exact same task as patch request with 200 status code.
      const response2 = await request(app).get('/tasks/1');
      expect(response2.body).toEqual(
        {
          id: 1,
          title: 'Buy Groceries',
          completed: false
        }
      )
      expect(response2.statusCode).toBe(200);
    });
  
    // Test response to Patch request updating 'title' field.
    test('It should respond with a single task with id : 2 and updated fields', async () => {
      const response1 = await request(app)
      .patch('/tasks/2')
      .type('form')
      .send({
          title : 'Brush Teeth'
      });

      // Should respond with Task updated in all fields and 200 status code.
      expect(response1.body).toEqual(
        {
          id: 2,
          title: 'Brush Teeth',
          completed: true
        }
      );
      expect(response1.statusCode).toBe(200);

      // Test to see if change has been written to database.
      // Should respond with exact same task as patch request with 200 status code.
      const response2 = await request(app).get('/tasks/2');
      expect(response2.body).toEqual(
        {
          id: 2,
          title: 'Brush Teeth',
          completed: true
        }
      )
      expect(response2.statusCode).toBe(200);
    });

    test('It should respond with a single task with id : 2 with updated fields with new fields filtered out', async () => {
      // Test response to patch request if given a field which is not in database. 
      const response1 = await request(app)
      .patch('/tasks/2')
      .type('form')
      .send({
          title : 'Gardening',
          due: 'tomorrow'

      });

      // Title field should be updated while due field should have been discarded
      expect(response1.body).toEqual(
        {
          id: 2,
          title: 'Gardening',
          completed: true
        }
      );
      expect(response1.statusCode).toBe(200);

      // Test to see if change has been written to database.
      // Should respond with exact same task as patch request with 200 status code.
      const response2 = await request(app).get('/tasks/2');
      expect(response2.body).toEqual(
        {
          id: 2,
          title: 'Gardening',
          completed: true
        }
      )
      expect(response2.statusCode).toBe(200);
    });
  

    // Test to see if correct 404 response code if trying to update task that does not exist
    test('It should respond with a 404 status code', async () => {
      const response = await request(app)
      .patch('/tasks/0')
      .type('form')
      .send({
          completed : true,
          title : 'Brush Teeth'
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /tasks/:id', () => {
    // Test to see if task is successfully deleted from database
    test('It should respond with a 204 and the task should no longer appear after a get', async () => {
      const deleteResponse = await request(app)
        .delete('/tasks/3');

      // Should response with a 204 status code
      expect(deleteResponse.statusCode).toBe(204);
  
      // Make sure we have 2 tasks now
      const response1 = await request(app).get('/tasks');
      expect(response1.body.length).toBe(2);
      expect(response1.statusCode).toBe(200);

      // Trying to do a GET request for deleted task should now return a 404
      const response2 = await request(app).get('/tasks/3');
      expect(response2.statusCode).toBe(404);
    });

    // Test to see if trying to delete a task that doesn't exist returns correct 404 response
    test('It should respond with a 404 status code', async () => {
      const response = await request(app)
        .delete('/tasks/0');
      expect(response.statusCode).toBe(404);
    });
  });
  