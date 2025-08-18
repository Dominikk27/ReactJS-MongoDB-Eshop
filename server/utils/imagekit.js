const ImageKit = require("imagekit");
const env = require("dotenv");

env.config();

var imageKit = new ImageKit({
    publicKey: process.env.imageKit_publicKey,
    privateKey: process.env.imageKit_privateKey,
    urlEndpoint: process.env.imageKit_urlEndpoint
});

module.exports = imageKit;