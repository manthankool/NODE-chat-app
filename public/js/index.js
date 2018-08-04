var socket = io();
socket.on('connect', function() {
  console.log('connected to server');



  socket.on('newMessage',function(message)  {
    console.log('New Message',message);
  });

  // socket.emit('createMessage',{
  //   from:'Koolwal',
  //   text:'ajj teri gaand maarunga'
  // });


});

socket.on('disconnect', function() {
  console.log('disconnected from the user');
});
