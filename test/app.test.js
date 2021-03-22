const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  test('It should respond with a string: "Hello World"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toEqual('Hello World');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /tasks', () => {
  test('It should respond with an array of tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.body).toEqual(
      [{
        id: 1,
        title: 'Buy groceries',
        completed: false,
      },
      {
        id: 2,
        title: 'Do laundry',
        completed: true,
      },
      ],
    );
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /tasks', () => {
  test('It should respond with new task object that has been inserted into DB', async () => {
    const newTask = await request(app)
      .post('/tasks')
      .type('form')
      .send({
        title: 'Brush Teeth',
      });

    expect(newTask.body).toHaveProperty('id');
    expect(newTask.body.title).toBe('Brush Teeth');
    expect(newTask.body.completed).toBe(false);
    expect(newTask.statusCode).toBe(201);

    // make sure we have 3 students now
    const response = await request(app).get('/tasks');
    expect(response.body.length).toBe(3);
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /tasks/:id', () => {
  test('It should respond with a single task with id : 1', async () => {
    const response = await request(app).get('/tasks/1');
    expect(response.body).toEqual(
      {
        id: 1,
        title: 'Buy groceries',
        completed: false,
      },
    );
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with a single task with id : 2', async () => {
    const response = await request(app).get('/tasks/2');
    expect(response.body).toEqual(
      {
        id: 2,
        title: 'Do laundry',
        completed: true,
      },
    );
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with a 404 status code', async () => {
    const response = await request(app).get('/tasks/0');
    expect(response.statusCode).toBe(404);
  });
});

describe('PUT /tasks/:id', () => {
    test('It should respond with a single task with id : 1 and updated fields', async () => {
      const response = await request(app)
      .put('/tasks/1')
      .type('form')
      .send({
          completed : true,
          title : 'Buy Groceries'
      });
      expect(response.body).toEqual(
        {
          id: 1,
          title: 'Buy Groceries',
          completed: true,
        },
      );
      expect(response.statusCode).toBe(200);
    });
  
    test('It should respond with a single task with id : 2 and updated fields', async () => {
      const response = await request(app)
      .put('/tasks/2')
      .type('form')
      .send({
          completed : true,
          title : 'Brush Teeth'
      });
      expect(response.body).toEqual(
        {
          id: 2,
          title: 'Brush Teeth',
          completed: true,
        },
      );
      expect(response.statusCode).toBe(200);
    });
  
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