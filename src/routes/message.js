const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../middlewares/auth');
const messageController = require('../controllers/message');

router.get('/:idReceiver', verifyAccess, messageController.getMessageById);

module.exports = router;
