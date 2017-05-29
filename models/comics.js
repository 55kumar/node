// Load required packages
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our user schema
var comics_schema = new Schema({
    name: {
        type: String
    },
    season_id: {
        type: Number
    },
    series_id:{
        type : Number
    },
    comic_id:{
        type : Number
    }
});

module.exports = mongoose.model('comics', comics_schema);