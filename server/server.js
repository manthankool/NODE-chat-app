const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname + './../public');    //__driname is refering to current folder



const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);   //from here socket will be able make connection between client & server.

app.use(express.static(publicPath));  //express middleware is used to server that public folder

io.on('connection', (socket) => { //conection is the name of event which lets you listen for new connections and it lets you do something when that connection comes in. This socket is similar to the socket in index.html
  console.log('new user connected');
  

     //now , this is not a listner so, we will not provide any callback

 socket.emit('newMessage',{
   from:'Admin',
   text:'Welcome to the chat app',
   createdAt:new Date().getTime()
 });

 socket.broadcast.emit('newMessage',{
   from:'Admin',
   text:'New User joined',
   createdAt:new Date().getTime()
 });

  socket.on('disconnect',() => {
    console.log('User has been disconnected from the server');
  });

  // socket.emit('newMessage',{
  //   from:'Manthan',
  //   text:'do you want to come',
  //   createdAt:new Date()
  // });

  socket.on('createMessage',(message) => {



    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
  });
  //   socket.broadcast.emit('newMessage',{
  //     from:message.from,
  //     text:message.text,
  //     createdAt:new Date().getTime()
  //   });
  // });

});
server.listen(port, () => {
  console.log('server is working');
});
