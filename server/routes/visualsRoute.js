const express = require("express");
const multer = require("multer");
const createStorage = require("../utils/storage.js");

const { getStats, getPartners, UpdatePartners } = require("../controller/visualsController.js");

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
    limits: {fileSize: 10 * 2048 * 2048}
});

const route = express.Router();

//STATS
route.get("/stats", getStats);

//PARTNERS
route.get("/partners", getPartners);
route.put("/partners/update", upload.array("partnerLogo", 10), UpdatePartners);



module.exports = route;