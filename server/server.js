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

  socket.on('disconnect',() => {
    console.log('User has been disconnected from the server');
  })

});
server.listen(port, () => {
  console.log('server is working');
});
