const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    Date:Date,
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    salle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salle'
    }
})

const Reservation = mongoose.model('Reservation',reservationSchema)

module.exports = Reservation;