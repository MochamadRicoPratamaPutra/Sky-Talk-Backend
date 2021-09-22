require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const httpServer = http.createServer(app);
const createError = require('http-errors');
const moment = require('moment');
moment.locale('id');
// const cookieParser = require('cookie-parser');
const route = require('./src/routes/index');
const jwt = require('jsonwebtoken');
const modelMessage = require('./src/models/message');
//middleware
const setupCors = {
  origin: `${process.env.TARGET_URL}`,
};
app.use(cors(setupCors));
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.json({ message: 'success' });
});
app.use(express.json());
app.use(route);
app.use(express.urlencoded({ extended: false }));
app.use('/file', express.static('./src/upload'));
app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
  });
});
//socket
const option = {
  cors: {
    origin: '*',
  },
};
const io = socket(httpServer, option);
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error('token expired');
        console.log(error);
        error.status = 401;
        return next(error);
      } else if (err.name === 'JsonWebTokenError') {
        const error = new Error('token invalid');
        console.log(error);
        error.status = 401;
        return next(error);
      } else {
        const error = new Error('token not active');
        error.status = 401;
        console.log(error);
        return next(error);
      }
    }
    socket.userId = decoded.id;
    socket.join(decoded.id);
    next();
  });
});
io.on('connection', (socket) => {
  console.log('Ada client yang terhubung', socket.id);
  console.log('User yang terhubung memiliki id ', socket.userId);
  socket.on('sendMessage', ({ idReceiver, messageBody }, callback) => {
    const dataMessage = {
      senderId: socket.userId,
      receiverId: idReceiver,
      message: messageBody,
      // createdAt: new Date(),
    };
    const datenow = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    callback({
      ...dataMessage,
      createdAt: moment(datenow).format('LT'),
      // createdAt: moment(dataMessage.createdAt).format('LT'),
    });
    // simpan ke db
    modelMessage.insertMessage(dataMessage).then(() => {
      console.log('success');
      socket.broadcast.to(idReceiver).emit('msgFromBackend', {
        ...dataMessage,
        createdAt: moment(datenow).format('LT'),
        // createdAt: moment(dataMessage.createdAt).format('LT'),
      });
    });
  });
  socket.on('disconnect', () => {
    console.log('ada perangkat yang terputus dengan id ', socket.id);
  });
});
httpServer.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
