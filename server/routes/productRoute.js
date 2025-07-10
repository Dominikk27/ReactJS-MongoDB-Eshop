const express = require("express");
const multer = require("multer");
const createStorage = require("../utils/storage.js");

const { fetch, addProduct, removeProduct, editProduct } = require("../controller/productController.js");
const upload = multer({ 
    storage: createStorage("products"),
    fileFilter:(req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error('Invalid format.'));
        }
    },
    limits: {fileSize: 5 * 2048 * 2048} 
});


const route = express.Router();

//PRODUCTS ACTIONS
route.get("/fetch", fetch);
route.post("/adminpanel/addProduct", upload.array("productImages", 8), addProduct);
route.delete("/adminpanel/deleteProduct/:id", removeProduct);
route.put("/adminpanel/editProduct/:id", upload.array("productImages", 8), editProduct);



module.exports = route;