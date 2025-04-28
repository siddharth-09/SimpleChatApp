const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const {Server} = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

//Socket Io Handles
io.on('connection',async(socket)=>{
    console.log('a made connection')
    socket.on('disconnect',()=>{
        console.log("User disconnected"
        )
    })
    socket.on('chat message',async(msg)=>{
        io.emit('chat message',msg)
    })

})


//Express Handles
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});