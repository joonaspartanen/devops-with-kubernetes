const express = require('express')
const axios = require('axios')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 8050
const path = require('path')
const directory = path.join('/', 'usr', 'src', 'app', 'images')
const filePath = path.join(directory, 'pic.jpg')
const { Client } = require('pg')

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

client.connect()
console.log(client)

client.query('CREATE TABLE IF NOT EXISTS Todo(id SERIAL PRIMARY KEY, content VARCHAR(255), done BOOLEAN);')

let lastPhotoUpdate = new Date()

const getTodos = async () => {
  const res = await client.query('SELECT * FROM Todo')
  console.log(res)

  const todos = res?.rows?.map(row => ({content: row.content, done: row.done}))
  return todos
}

const addTodo = async (todo) => {
  const query = 'INSERT INTO Todo (content, done) VALUES ($1, $2)'
  const values = [todo.content, false]
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
}

const fetchPhotoFromApi = async () => {
  const response = await axios.get('https://picsum.photos/800', { responseType: 'stream' })
  try {
    response.data.pipe(fs.createWriteStream(filePath))
  } catch (err) {
    console.log(err)
  }
  lastPhotoUpdate = new Date()
}

app.use('/todoapp/img', express.static(path.join(__dirname, 'images')))
app.use(express.json())

fetchPhotoFromApi()

app.get('/todoapp/api/todos', async (req, res) => {
  if (lastPhotoUpdate.getDate() !== new Date().getDate()) {
    fetchPhotoFromApi()
  }

  const todos = await getTodos()
  res.json(todos)
})

app.post('/todoapp/api/todos', async (req, res) => {
  console.log(req)
  const todo = { content: req.body.content, done: false }
  addTodo(todo)
  res.json(todo)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
