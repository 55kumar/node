// Load required packages
var mongoose = require('mongoose');
  var  Schema = mongoose.Schema;

// Define our user schema
var UserSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    id: {
        type: Number
    }

});

module.exports = mongoose.model('User', UserSchema);