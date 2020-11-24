const express = require('express')
const axios = require('axios')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 8000
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'images')
const filePath = path.join(directory, 'pic.jpg')

let lastPhotoUpdate = new Date()

const fetchPhotoFromApi = async () => {
  const response = await axios.get('https://picsum.photos/800', { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(filePath))
  lastPhotoUpdate = new Date()
}

app.use('/todoapp/img', express.static(path.join(__dirname, 'images')))
console.log(path.join(__dirname, 'images'))

fetchPhotoFromApi()

app.get('/todoapp', (req, res) => {
  if (lastPhotoUpdate.getDate() !== new Date().getDate()) {
    fetchPhotoFromApi()
  }

  lastPhotoUpdate.requests++
  res.sendFile(path.join(__dirname + '/templates/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
