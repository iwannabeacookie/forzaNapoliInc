const express = require('express')
const app = express()
const port = 3000
const mClient = require('./mongodb/mongodb.js')

app.get('/', (req, res) => {
  res.send('helo')
})

app.listen(port, async () => {
  console.log(`running at http://localhost:${port}`)
})
