const mongoose = require("mongoose");


const partnerSchema = new mongoose.mongoose.Schema({
    partnerLogo:{
        type:String,
        required: true
    }
}, {collection: "Partners"});


module.exports = mongoose.model("Partners", partnerSchema);