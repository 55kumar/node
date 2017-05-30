// Load required packages
var mongoose = require('mongoose')
var Schema = mongoose.Schema;



// Define our season schema
var season_schema = new Schema({
       name: {
        type: String
    },
    season_id: {
        type: Number
    },
    series_id:{
        type : Number
    }
});
 
module.exports = mongoose.model('season', season_schema);
