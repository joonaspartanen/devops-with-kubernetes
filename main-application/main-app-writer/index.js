const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'hashes.txt')

const currentHash = { date: new Date(), hash: '' }


const saveHash = () => {
  const hash = setCurrentHash()
  fs.writeFile(filePath, hash, function(err) {
    if (err) {
      return console.log(err)
    }
  })
  console.log(hash)
}

const setCurrentHash = () => {
  const date = new Date()
  const hash = uuid.v4()
  currentHash['date'] = date
  currentHash['hash'] = hash

  return hashToString(currentHash)
}

const hashToString = hash => `${hash.date.toLocaleTimeString()}: ${hash.hash}`

setInterval(saveHash, 5000)
