var mongoose = require('mongoose');
var schemaSalle = new mongoose.Schema({
    Name :String,
    Capacity : Number,
    Equipments:String,
    IsAvailable : Boolean,
    Location:String,
    StartTime:String,
    EndTime : String,
    Price:Number,
});
var Salle = new mongoose.model('Salle', schemaSalle);
module.exports = Salle;