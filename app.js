const express = require('express')
const app = express()

app.get('/', (req,res)=> { //get method
  res.send('Hello World') //send response
})
app.listen(3000)