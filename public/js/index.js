var socket = io();
socket.on('connect', function() {
  console.log('connected to server');


  socket.emit('createEmail',{
    to:'mak@gmail.com',
    text:'this is dick'
  });

  socket.on('newMessage',function(message)  {
    console.log('New Message',message);
  });

  socket.emit('createMessage',{
    to:'Koolwal',
    text:'ajj teri gaand maarunga'
  });


});

socket.on('disconnect', function() {
  console.log('disconnected from the user');
});

socket.on('newEmail', function(email) {
  console.log('New Email',email);
});
