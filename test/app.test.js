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
