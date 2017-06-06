// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressjwt = require('express-jwt');
// var jwt = require('jsonwebtoken');
var auth = require('./auth.json');




//var Regex = require("regex");
// Connect to the MongoDB
var connection=mongoose.connect('mongodb://localhost:27017/Manga');

// Create Express application
var app = module.exports = express();
app.use(expressjwt({secret : auth.secret}).unless({path : ['/api/v1/Check', '/api/v1/users']}))
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
