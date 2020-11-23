const express = require('express')
var uuid = require('uuid')
const app = express()
const PORT = process.env.PORT || 8000

const currentHash = { date: new Date(), hash: '' }

app.get('/', (req, res) => {
  res.send(hashToString(currentHash))
})


app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
  console.log(setCurrentHash())
   
  setInterval(() => console.log(setCurrentHash()), 5000)
})

const setCurrentHash = () => {
  const date = new Date()
  const hash = uuid.v4()
  currentHash['date'] = date
  currentHash['hash'] = hash

  return hashToString(currentHash)
}

const hashToString = hash => `${hash.date.toLocaleTimeString()}: ${hash.hash}`
