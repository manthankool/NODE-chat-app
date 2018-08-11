var moment = require('moment');

var date = moment();    //this creates a moment object which denotes a currentpoint in time
// date.add(7,'years').subtract(10,'months');
// console.log(date.format('MMM Do, YYYY'));

// console.log(date.format('LT'));
var t= new Date().getTime();
var s = moment().valueOf();

console.log(t);
console.log(s);
