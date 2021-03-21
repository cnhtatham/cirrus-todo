const express = require('express')
const app = express()
const fs = require('fs')

var tasks = JSON.parse(fs.readFileSync('tasks.json'))

app.get('/', (req,res)=> { //get method
  res.send("Hello World") //send response
})



app.listen(3000)