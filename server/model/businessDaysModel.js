const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
    day:{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: false,
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
});

const businessDaysSchema = new mongoose.Schema({
  days: [daySchema]
},{collection: "Businessdays"});

module.exports = mongoose.model("BusinessDays", businessDaysSchema);
