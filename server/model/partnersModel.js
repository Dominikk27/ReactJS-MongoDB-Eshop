const mongoose = require("mongoose");


const partnerSchema = new mongoose.mongoose.Schema({
    partnerLogo:{
        type:String,
        required: true
    }
})


module.exports = mongoose.model("Partners", partnerSchema);