// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressjwt = require('express-jwt');
const pathToRegexp = require('path-to-regexp');

// var email = require ('./email.json');
var auth = require('./auth.json');
// const nodemailer = require('nodemailer');

// // create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport({ 
//     service: 'Gmail',
//     host: 'smtpout.secureserver.net', 
//     port: 465, 
//     auth: { user: email.user, pass: email.pass },
//     secure: true
// });

// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"kartik chawla" <kchawla1995@gmail.com>', // sender address
//     to: 'kartik.chawla@kelltontech.com', // list of receivers
//     subject: 'welcome', // Subject line
//     text: 'you have just signed up for manga', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// }

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });









//var Regex = require("regex");
// Connect to the MongoDB
var connection=mongoose.connect('mongodb://localhost:27017/Manga');

// Create Express application
var reg = new RegExp('/api/v2/verification/');
var app = module.exports = express();
// /^\/api\/v2\/verification\/.*/
app.use(expressjwt({secret : auth.secret}).unless({path : ['/api/v1/Check', '/api/v1/users',"/api/v2/verify/email", /^\/api\/v2\/verification\/.*/]}))
var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

routes = require('./routes/index')
app.use('/api', routes);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

// Start the server
app.listen(port);
console.log('App Running on port ' + port);
