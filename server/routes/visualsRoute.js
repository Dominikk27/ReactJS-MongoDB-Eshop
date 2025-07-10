const express = require("express");
const multer = require("multer");
const createStorage = require("../utils/storage.js");

const { getStats} = require("../controller/visualsController.js");

const upload = multer({
    storage: createStorage("partners"),
    fileFilter:(req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Invalid Format!"));
        }
    },
    limits: {fileSize: 5 * 2048 * 2048}
});

const route = express.Router();

//STATS
route.get("/stats", getStats);

module.exports = route;