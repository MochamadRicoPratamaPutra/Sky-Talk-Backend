const express = require('express')
const route = express.Router()
const messageRouter = require('./message')
const usersRouter = require('./users')
route
  .use('/users', usersRouter)
  .use('/message', messageRouter)
module.exports = route