const express = require('express')
const app = express()
const userRoute = require('./api/routes/user')
const Connect = require('./api/cofig/db')
const bodyParser = require('body-parser')
require('dotenv').config()

Connect()
const PORT = process.env.PORT || 4000
app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/route/user', userRoute)

app.listen(PORT, () => {
  console.log(`server is running :${PORT}`)
})
