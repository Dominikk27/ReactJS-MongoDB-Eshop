const mongoose = require("mongoose");


const businessDaySchema = new mongoose.Schema({
    day:{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true,
    },
    isOpen:{
        type: Boolean,
        required: false,
    },
    openTime:{
        type:String,
        required: false,
    },
    closeTime:{
        type:String,
        required: false,
    }
},{collection: "Businessdays"});

module.exports = mongoose.model("BusinessDays", businessDaySchema);
