const express = require('express')
const app = express()
const cors = require('cors')
const time = require('morgan')
const Body = require('body-parser')

const callRoute = require('./source/index')
const { port } = require('./source/configs/env')

app.use(
  Body.urlencoded({
    extended: false
  })
)
app.use(Body.json())
app.use(time('dev'))
app.use('/', cors(), callRoute)
app.listen(port, () => console.log(`PORT: ${port}`))
