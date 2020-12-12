const axios = require('axios')

const getUrlToRead = async () => {
  const response = await axios.get('https://en.wikipedia.org/wiki/Special:Random')
  const urlToRead = response.request.res.responseUrl
  console.log(urlToRead)
  return urlToRead
}

const sendReminder = async () => {
  const urlToRead = await getUrlToRead()

  console.log('Preparing to send...')
  const response = await axios.post(
    'http://todo-app-svc.todo-namespace.svc.cluster.local:2348/todoapp/api/todos',
    { content: `Read: ${urlToRead}` },
  )

  console.log(response)
}

sendReminder()
