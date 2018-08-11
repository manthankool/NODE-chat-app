var socket = io();
socket.on('connect', function() {
  console.log('connected to server');



  socket.on('newMessage',function(message)  {
    console.log('New Message',message);
    var li = jQuery('<li></li>');          //create a list item, adding the item to the markup to make it invisible
    console.log(li);
    li.text(`${message.from}:${message.text}`);   //making its text property
    console.log(li);
    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage' , function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
  })

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

jQuery('#message-form').on('submit', function (e) {     //here e is overiding the disadvantage of using the form method. It will avoid refreshing the whole page. Submit is a jQuery event handler
  e.preventDefault();     // it will prevent the default behaviour of the event
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if(!navigator.geolocation){            //gelocator sits on 'navigator' in every browser and if it is not available we will make alert
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position) {            //navigator is the inbuilt function of geolocation and it will take two function . One is success
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    return alert('Unable to fetch location');
  });

});
