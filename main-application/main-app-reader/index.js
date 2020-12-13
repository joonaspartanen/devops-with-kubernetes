const express = require('express')
const app = express()
const axios = require('axios')
const PORT = process.env.PORT || 8000
const fs = require('fs')
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const hashPath = path.join(directory, 'hashes.txt')
const pingPongPath = path.join(directory, 'pingpong.txt')

app.get('/', async (req, res) => {
  const hash = readHash()
  const pingPongs = await getPingPongs()
  console.log(hash)
  console.log(pingPongs)
  res.send(`<p>${process.env.MESSAGE}</p><p>${hash}</p><p>Ping / pongs: ${pingPongs.counter}</p>`)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

const readHash = () => {
  try {
    return fs.readFileSync(hashPath, 'utf8')
  } catch (err) {
    console.log(err)
    return ''
  }
}

// DEPRECATED
const readPingPongs = () => {
  try {
    return fs.readFileSync(pingPongPath, 'utf8')
  } catch (err) {
    console.log(err)
    return ''
  }
}

const getPingPongs = async () => {
  try {
    const response = await axios.get('http://pingpong-app-svc/pingpong')
    return response.data
  }
  catch (err) {
    console.error('Unable to get /pingpong')
  }
}