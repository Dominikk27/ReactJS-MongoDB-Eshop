const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },

    LastName:{
        type:String,
        required:true
    },

    PhoneNumber:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true
    },

    ReservationDate:{
        type:Date,
        required:true
    },
}, {collection: "Reservations"});

module.exports = mongoose.model("Reservations", ReservationSchema);