const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const fs = require('fs')
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.txt')

// DEPRECATED
const saveToFile = () => {
  const data = `Ping / Pongs: ${counter}`
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      return console.log(err)
    }
  })
  console.log(data)
}

let counter = 0
//saveToFile()

app.get('/', (req, res) => {
  counter++
  res.json({ counter })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
