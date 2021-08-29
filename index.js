const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const httpServer = http.createServer(app);

//middleware
app.use(cors());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

//socket
const option = {
  cors: {
    origin: '*',
  },
};
const io = socket(httpServer, option);
io.on('connection', (socket) => {
  console.log('Ada client yang terhubung', socket.id);
  socket.on('sendMsgToBack', (data) => {
    // io.emit('sendMsgToFront', 'Hello Rico, Welcome to the Club')
    // io.emit untuk ke semua user
    socket.emit('sendMsgToFront', 'Hello Rico, Welcome to the Club');
    // socket.broadcast.emit('sendMsgToFront', 'Hello Rico, Welcome to the Club') kirim ke dirinya sendiri
    // broadcast untuk kirim ke semua user yang terknokesi kecuali user yang itu sendiri
  });
  socket.on('disconnect', () => {
    console.log('Ada perangkat yang terputus', socket.id);
  });
});

httpServer.listen(4000, () => {
  console.log('Server is running on port' + 4000);
});