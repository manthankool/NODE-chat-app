const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname + './../public');    //__driname is refering to current folder

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);   //from here socket will be able make connection between client & server.

app.use(express.static(publicPath));  //express middleware is used to server that public folder

io.on('connection', (socket) => { //conection is the name of event which lets you listen for new connections and it lets you do something when that connection comes in. This socket is similar to the socket in index.html
  console.log('new user connected');


     //now , this is not a listner so, we will not provide any callback

 socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

 socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));   //sends to all of them but the new user joined

  socket.on('disconnect',() => {
    console.log('User has been disconnected from the server');     //send only to one person
  });

  // socket.emit('newMessage',{
  //   from:'Manthan',
  //   text:'do you want to come',
  //   createdAt:new Date()
  // });

  socket.on('createMessage',(message, callback) => {
    console.log('message',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });
  //   socket.broadcast.emit('newMessage',{
  //     from:message.from,
  //     text:message.text,
  //     createdAt:new Date().getTime()
  //   });
  // });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });

});
server.listen(port, () => {
  console.log('server is working');
});

module.exports.app = app;
