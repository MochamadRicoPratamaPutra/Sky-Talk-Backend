const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/multer')
// const redisCache = require('../middlewares/redis')

router
  .get('/', auth.verifyAccess, userController.getAllUser)
  .put('/forgot/:email', userController.forgotPassword)
  .use('/confirm', userController.sendEmailForgot)
  .post('/register', upload.single('profilePicture'), userController.register)
  .post('/login', userController.login)
  .get('/:idsaya', auth.verifyAccess, userController.getUserById)
  .put('/:id', auth.verifyAccess, upload.single('profilePicture'), userController.updateUser)
  .delete('/:id', auth.verifyAccess, userController.deleteUser)
  .delete('/', auth.verifyAccess, userController.deleteUser)
  .use('/verification/:id', userController.verificationUser)
module.exports = router