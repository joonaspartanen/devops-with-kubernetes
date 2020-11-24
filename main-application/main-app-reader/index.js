const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const fs = require('fs')
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const hashPath = path.join(directory, 'hashes.txt')
const pingPongPath = path.join(directory, 'pingpong.txt')

app.get('/', (req, res) => {
  const hash = readHash()
  const pingPongs = readPingPongs()
  console.log(hash)
  console.log(pingPongs)
  res.send(`<p>${hash}</p><p>${pingPongs}</p>`)
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

const readPingPongs = () => {
  try {
    return fs.readFileSync(pingPongPath, 'utf8')
  } catch (err) {
    console.log(err)
    return ''
  }
}
