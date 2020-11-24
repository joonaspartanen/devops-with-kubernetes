const express = require('express')
const axios = require('axios')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 8050
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'images')
const filePath = path.join(directory, 'pic.jpg')

let lastPhotoUpdate = new Date()

const fetchPhotoFromApi = async () => {
  const response = await axios.get('https://picsum.photos/800', { responseType: 'stream' })
  try {
    response.data.pipe(fs.createWriteStream(filePath))
  } catch (err) {
    console.log(err)
  }
  lastPhotoUpdate = new Date()
}

app.use('/todoapp/img', express.static(path.join(__dirname, 'images')))

fetchPhotoFromApi()

app.get('/todoapp/api/todos', (req, res) => {
  if (lastPhotoUpdate.getDate() !== new Date().getDate()) {
    fetchPhotoFromApi()
  }

  const todos = [
    { content: 'Clean the house', done: false },
    { content: 'Wash the dishes', done: true },
  ]
  res.json(todos)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
