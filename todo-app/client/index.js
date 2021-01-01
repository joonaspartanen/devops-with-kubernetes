const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8040
const path = require('path')

app.get('/', (req, res) => {
  console.log('sending index.html')
  res.status(200).sendFile(path.join(__dirname + '/templates/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})