// Load required packages
var mongoose = require('mongoose').Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');


// Define our series schema
var series_schema = new Schema({
       name: {
        type: String
    },
    series_id:{
        type : Number
    }
});

module.exports = mongoose.model('series', series_schema);
