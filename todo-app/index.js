const express = require('express')
var path = require('path')
const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/templates/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
