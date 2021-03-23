# cirrus-todo
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>


## About The Project

This is a fully functioning ToDo List API which uses simple HTTP requests with various methods to interect with a JSON object database containing a list of stored tasks.

Each task only has a unique Id and 2 extra fields: `title, completed` and will look like the following:
```
{
  id: 1,
  title: 'Buy groceries',
  completed: false,
}
```

`id` Is a unique identifier which is assigned when the task is created and cannot be changed 
`title` Will always be a string containing the name of the task
`completed` Will always be a Boolean value

### Built With

This project was build using:
* [Express](https://expressjs.com/)

Tests were carried out using:
* [Jest](https://jestjs.io/)
* [Supertest](https://www.npmjs.com/package/supertest)
* [ESLint](https://eslint.org/) using the [airbnb style guide](https://github.com/airbnb/javascript)
* [Postman](https://www.postman.com/)

The following guids were used to help build the project and write the code:
* [https://medium.com/@pojotorshemi/integration-test-on-express-restful-apis-using-jest-and-supertest-4cf5d1414ab0](https://medium.com/@pojotorshemi/integration-test-on-express-restful-apis-using-jest-and-supertest-4cf5d1414ab0)
* [https://medium.com/easyread/introduction-to-express-js-246191ec05f2](https://medium.com/easyread/introduction-to-express-js-246191ec05f2)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites


* node v14.X
* npm v6.14.7

### Installation

1. 
2. Clone the repo
   ```
   git clone https://github.com/cnhtatham/cirrus-todo.git
   ```
3. Install NPM packages
   ```
   npm install
   ```
4. Launch your ToDo list API
   ```
   node server.js
   ```
   
 <!-- USAGE EXAMPLES -->
## Usage

### GET /tasks

Returns full list of tasks in database.

Example:
```
Request URL: example.com/tasks

Request Data: N/A

Response code: 200 OK

Response data:
[
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false
  },
  {
    "id": 2,
    "title": "Do laundry",
     "completed": true
  }
]
```

### GET /tasks/:id

Returns single task by id url parameter

Example: 
```
Request URL: example.com/tasks/1

Request Data: N/A

Response code: 200 OK

Response data:
{
"id": 1,
"title": "Buy groceries",
"completed": false
}
```

### POST /tasks

Creates new task 

Example: 
```
Request URL: example.com/tasks

Request Data: 
{
  "title": "Buy groceries"
}

Response code: 201 created

Response data: 
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false
}
```

### PUT /tasks/:id

Allows a full update of a task. Both title and completed arguments must be provided.

Example:
```
Request URL: example.com/tasks/1

Request data: 
{
  "title": "Buy groceries",
  "completed": true
}

Response code: 200 OK

Response data: 
{
  "id": 1,
  "title": "Buy groceries",
  "completed": true
}
```

### PATCH /tasks/:id

Allows a partial update of a task.

Example:
```
Request URL: example.com/tasks/1

Request data:
{
  "completed": true
}

Response code: 200 OK

Response data: 
{
  "id": 1,
  "title": "Buy groceries",
  "completed": true
}
```

### DELETE /tasks/:id

Deletes a task

Example:
```
Request URL: example.com/tasks/1

Request data: N/A

Response code: 204 No content

Response data: N/A
```

<!-- ROADMAP -->
## Roadmap

There were many ideas I have for how this API could be improved and potential issues it could face currently:

* At the moment, No new fields can be created and as it stands, should the functionality be added to add new fields to tasks, the way the database is updated will need changing as its only built to handle the fields currently available
* Use of a proper Database such as MongoDB would aid massively, not just due to scalability, but the functionailty that comes with it when its comes to updating/saving new data
* A User interface would be another big help, making the ability to make requests and use the api much more user friendly
