const { storage } = require("firebase-admin");
const Product = require("../model/productModel.js");

const env = require("dotenv");
env.config();

const fs = require('fs');
const path = require('path');


const createStorage = require("../utils/storage.js");


//STATS
const getStats = async (req, res) =>{
    try{
        const activeProduct = await Product.countDocuments();
        const activeOnSaleProduct = await Product.countDocuments({ onSale: true});

        res.json({
            activeProduct,
            activeOnSaleProduct
        })
    }catch(e){
        console.error("Error getting stats: ", e);
        res.status(500).json({error: "Server Error!"});
    }
}


module.exports = { getStats };