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

  socket.emit('newEmail', {
    from:'manthankoolwal2450@gmail.com',
    text:'Hey get fucked by me',
    createAt:123
  });       //now , this is not a listner so, we will not provide any callback

  socket.on('createEmail', (newEmail) => {
    console.log('New Email', newEmail);

  });

  socket.on('disconnect',() => {
    console.log('User has been disconnected from the server');
  });

  socket.emit('newMessage',{
    from:'Manthan',
    text:'do you want to come',
    createdAt:new Date()
  });

  socket.on('createMessage',(message) => {
    console.log('Create Message',message);
  });

});
server.listen(port, () => {
  console.log('server is working');
});
