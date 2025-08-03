const mongoose = require('mongoose');


const socialSchema = new mongoose.Schema({
    Instagram: {
        type: String,
        required: false,
    },
    Facebook: {
        type: String,
        required: false,
    },
    Youtube: {
        type: String,
        required: false,
    },
    Twitter: {
        type: String,
        required: false,
    },
    Google: {
        type: String,
        required: false,
    },
}, {collection: "Socials"});

module.exports = mongoose.model("Socials", socialSchema);