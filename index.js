const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
})

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`)
})