const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const fs = require('fs')
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.txt')
const { Client } = require('pg')

let counter = 0

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

client.connect()
console.log(client)

const initializeDb = async () => {
  client.query('CREATE TABLE IF NOT EXISTS Pingpong(id INTEGER PRIMARY KEY, counter INTEGER);')
  const rows = await client.query('SELECT * FROM Pingpong;')
  console.log(rows)
  if (rows.rowCount === 0) {
    const res = await client.query('INSERT INTO Pingpong (id, counter) VALUES (1, 0)')
    console.log(res)
  } else {
    const res = await client.query('SELECT * FROM Pingpong WHERE id = 1')
    console.log(res)
    counter = res.rows[0].counter
  }
}

initializeDb()

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

//saveToFile()

console.log(process.env.POSTGRES_DB)

app.get('/pingpong', (req, res) => {
  counter++
  const query = {
    text: 'UPDATE Pingpong SET counter = $1 WHERE id = 1',
    values: [counter],
  }
  client.query(query)
  res.json({ counter })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
