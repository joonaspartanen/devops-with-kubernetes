const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const fs = require('fs')
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'hashes.txt')

app.get('/', async (req, res) => {
  const hash = await readHash()
  console.log(hash)
  res.send(hash)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

const readHash = async () => {
  const hash = fs.readFileSync(filePath, 'utf8')
  return hash
}
