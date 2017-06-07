// Load required packages
var mongoose = require('mongoose');
  var  Schema = mongoose.Schema;

// Define our user schema
var tempschema = new Schema({
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
    },
    verified : {
        type : Boolean
    },
    random : {
        type : String
    }

});

module.exports = mongoose.model('tempusers', tempschema);