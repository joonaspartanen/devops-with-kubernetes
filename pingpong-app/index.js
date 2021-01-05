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

const dbConnectionOk = async () => {
  try {
    const res = await client.query('SELECT NOW()')
    console.log('Health check ok: ', res)
    return true
  } catch (err) {
    console.error('Health check failed: ', err)
    return false
  }
}

const connectToDb = () => {
  client
    .connect()
    .then(() => console.log('Connected to db'))
    .catch(err => {
      console.error('Error connecting to db: ', err)
    })
}

const initializeTable = () => {
  client
    .query('CREATE TABLE IF NOT EXISTS Pingpong(id INTEGER PRIMARY KEY, counter INTEGER);')
    .then('Table pingpong created')
    .catch(err => {
      console.error('Creating table failed: ', err)
    })

  client
    .query('SELECT * FROM Pingpong;')
    .then(res => {
      if (res.rowCount === 0) {
        client
          .query('INSERT INTO Pingpong (id, counter) VALUES (1, 0)')
          .then(result => console.log(result))
          .catch(err => {
            console.error('Initializing counter failed: ', err)
          })
      } else {
        client
          .query('SELECT * FROM Pingpong WHERE id = 1')
          .then(result => (counter = result.rows[0].counter))
          .catch(err => {
            console.error('Updating counter failed: ', err)
          })
      }
    })
    .catch(err => {
      console.error('Connection failed: ', err)
    })
}

const initializeDb = () => {
  connectToDb()
  initializeTable()
}

initializeDb()

// DEPRECATED
const saveToFile = () => {
  const data = `Ping / Pongs: ${counter}`
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      return console.error(err)
    }
  })
  console.log(data)
}

//saveToFile()

app.get('/pingpong', (req, res) => {
  counter++
  const query = {
    text: 'UPDATE Pingpong SET counter = $1 WHERE id = 1',
    values: [counter],
  }
  client.query(query)
  res.json({ counter })
})

app.get('/pingpong/healthz', async (req, res) => {
  const ok = await dbConnectionOk()
  if (ok) return res.sendStatus(200)
  else {
    initializeDb()
    return res.sendStatus(500)
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
