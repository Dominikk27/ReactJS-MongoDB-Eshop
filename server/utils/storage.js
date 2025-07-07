const multer = require("multer");
const path = require("path");
const fs = require("fs");

function createStorage(storageFolder){
    const dir = path.join(__dirname, "..", "images", storageFolder)
    return multer.diskStorage({
        destination: function(req, file, cb){
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true});
            }
            cb(null, dir);
        },
        filename: function(req, file, cb) {
            const uniqueID = Date.now() + "-" + Math.floor(Math.random() * 9999);
            const fileName = path.extname(file.originalname)
            cb(null, uniqueID + fileName);
        }
    });
}


module.exports = createStorage;