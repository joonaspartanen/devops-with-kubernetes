var uuid = require("uuid")

const generateRandomString = () => {
  const randomString = uuid.v4()
  console.log(randomString)
}

generateRandomString()
setInterval(generateRandomString, 5000)
