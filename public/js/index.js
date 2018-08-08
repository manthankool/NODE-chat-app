var socket = io();
socket.on('connect', function() {
  console.log('connected to server');



  socket.on('newMessage',function(message)  {
    console.log('New Message',message);
    var li = jQuery('<li></li>');          //create a list item, adding the item to the markup to make it invisible
    li.text(`${message.from}:${message.text}`);   //making its text property

    jQuery('#messages').append(li);
  });

  // socket.emit('createMessage',{
  //   from:'Koolwal',
  //   text:'ajj teri gaand maarunga'
  // });


});

socket.on('disconnect', function() {
  console.log('disconnected from the user');
});

// socket.emit('createMessage',{
//   from:'Manthan',
//   text:'Hi'
// }, function (data) {
//   console.log('Got it',data);
// });

jQuery('#message-form').on('submit', function (e) {     //here e is overiding the disadvantage of using the form method. It will avoid refreshing the whole page
  e.preventDefault();     // it will prevent the default behaviour of the event

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  }, function () {

  });
});
