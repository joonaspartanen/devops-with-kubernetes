const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8040
const path = require('path')

app.use('/todoapp/img', express.static(path.join(__dirname, 'images')))

app.get('/todoapp', (req, res) => {
  res.sendFile(path.join(__dirname + '/templates/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})