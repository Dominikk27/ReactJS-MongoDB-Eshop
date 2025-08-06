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

    ReservationTime:{
        type:String,
        required:true
    },

    ProductCode:{
        type:String,
        required:true
    },

    ReservationNote:{
        type:String,
        required:false
    },

    status: {
        type: String,
        enum: ['new', 'active', 'cancelled', 'completed'],
        default: 'new'
    }
}, {collection: "Reservations"});

module.exports = mongoose.model("Reservations", ReservationSchema);