const express = require('express')
const route = express.Router()
// const reservationRouter = require('./reservation')
// const vehicleRouter = require('./vehicle')
const usersRouter = require('./users')
route
  .use('/users', usersRouter)
  // .use('/reservation', reservationRouter)
  // .use('/vehicle', vehicleRouter)
module.exports = route