const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname + './../public');    //__driname is refering to current folder




var app = express();

app.use(express.static(publicPath));  //express middleware is used to server that public folder
const port = process.env.PORT || 3000;
// app.get('/', (req,res) => {
//   res.send(publicPath);
//
// });

app.listen(port, () => {
  console.log('server is working');
});
