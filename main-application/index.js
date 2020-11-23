const express = require('express')
var uuid = require('uuid')
const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
  console.log(generateRandomStringWithTimestamp())
  setInterval(() => console.log(generateRandomStringWithTimestamp()), 5000)
})

const generateRandomStringWithTimestamp = () => {
  return `${new Date().toLocaleTimeString()}: ${uuid.v4()}`
}
