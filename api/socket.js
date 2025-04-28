import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server);
    io.on('connection', socket => {
      console.log('a user connected');

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    });
    console.log('Socket.IO server started');
  }
  res.end();
}
