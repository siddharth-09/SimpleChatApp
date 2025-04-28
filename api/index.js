const { createServer } = require('http');
const express = require('express');
const { Server } = require('socket.io');
const { join } = require('path');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: '/api/socket/io',
  addTrailingSlash: false
});

//Socket.IO handlers
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

//Express Handlers
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../../index.html')); 
});

// ❗ Important: Export the server
module.exports = (req, res) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...');
    res.socket.server.io = io;
  }
  res.end();
};
