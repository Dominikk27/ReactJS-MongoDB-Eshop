const { storage } = require("firebase-admin");
const Product = require("../model/productModel.js");

const env = require("dotenv");
env.config();

const fs = require('fs');
const path = require('path');


const createStorage = require("../utils/storage.js");


const fetch = async (req, res) => {
    try {
        const products = await Product.find();
        if (products === 0) {
            console.log("DB is empty!");
        }
        res.status(200).json(products);

    } catch(e){
        res.status(500).json({error: "Internal Server Error!"})
    }
};


const fetchProductData = async (req, res) => {
    const productID = req.params.id;

    try{
        const product = await Product.findById(productID);

        if(!product) {
            console.error("Failed to find product with this ID!");
            res.status(404).json({message: "Product not found!"});
            return;
        }
        res.status(200).json(product);

    }catch (e){
        console.error("Failed to fetch product data! error: ", e);
        res.status(404).json({error: "Failed to get product data!"});
    }
}

const STORAGE_URI = process.env.STORAGE_URI;

const addProduct = async (req, res) => {
    //const file = req.files;

    try{
        const { productName, productDescription, defaultPrice, onSale, onSalePrice, productType, productDrive } = req.body;
        
        if(!productName || !defaultPrice) {
            return res.status(400).json({error: "Product name and price are required!"});
        }

        const productImages = req.files?.map(file =>
        (STORAGE_URI + file.path
            .replace(path.join(__dirname, "..", "images"), "/images")
            .replace(/\\/g,"/"))
        ) || [];

        let productDetails = {};
        try {
            productDetails = req.body.productDetails 
                ? JSON.parse(req.body.productDetails)
                : {};
        } catch (e) {
            console.error("Chyba pri parsovaní productDetails:", e);
            return res.status(400).json({ error: "Neplatný formát detailov produktu" });
        }

        const newProduct = new Product({
            productName,
            productDescription,
            defaultPrice: parseFloat(defaultPrice),
            onSalePrice: parseFloat(onSalePrice),
            onSale,
            productImages,
            productType,
            productDrive,
            productDetails
        }); 

        await newProduct.save();

        res.status(200).json(newProduct);
    }catch(e){
        console.error("FAILED to add product into DB: ",e);
        res.status(500).json({error:"FAILED to ADD PRODUCT INTO DB!"});
    }

};

const removeProduct = async (req, res) => {
    const productID = req.params.id;

    try {
        const product = await Product.findById(productID);

        if (!product){
            return res.status(404).json({error: "Product not found!"});
        }

        for (const imagePath of product.productImages) {
            const absolutePath = path.join(__dirname, "..", imagePath.replace(process.env.STORAGE_URI,""));
            if(fs.existsSync(absolutePath)){
                fs.unlinkSync(absolutePath);
            }
        }

        await Product.findByIdAndDelete(productID);

        res.status(200).json({message: "Product successfully removed from DB!"});
    }catch(e){
        console.error("Error deleting product: ", e);
        res.status(500).json({error: "Internal server error wia deleting product"});
    }
};


const editProduct = async (req, res) => {
    const productID = req.params.id;

    try{
        const product = await Product.findById(productID);
        
        if(!product){
            return res.status(404).json({error: "Product not found!"});
        }

        const {
            productName,
            productDescription,
            defaultPrice,
            onSale,
            onSalePrice, 
            oldImages,
            productType,
            productDrive,
            productDetails: parsedProductDetails
        } = req.body;

        

        const oldIMG = oldImages ? JSON.parse(oldImages) : [];

        const imgToRemove = product.productImages.filter(image =>
            !oldIMG.includes(image)
        );

        imgToRemove.forEach(imageURL => {
            const relativePath = imageURL.replace(STORAGE_URI, "").replace(/^\/+/, "");
            const absolutePath = path.join(__dirname, "..", relativePath);
            if(fs.existsSync(absolutePath)){
                fs.unlinkSync(absolutePath);
            }
        });


        const newImagePaths = (req.files || []).map(file =>
            STORAGE_URI + file.path
            .replace(path.join(__dirname, "..", "images"), "/images")
            .replace(/\\/g, "/")
        );

        product.productImages = [...oldIMG, ...newImagePaths];
        product.productName = productName || product.productName;
        product.productDescription = productDescription || product.productDescription;
        product.productType = productType || product.productType;
        product.productDrive = productDrive || product.productDrive;

        if (defaultPrice !== undefined && defaultPrice !== '') {
            const parsedDefaultPrice = parseFloat(defaultPrice);
            if (!isNaN(parsedDefaultPrice)) product.defaultPrice = parsedDefaultPrice;
        }

        if (onSalePrice !== undefined && onSalePrice !== '') {
            const parsedOnSalePrice = parseFloat(onSalePrice);
            if (!isNaN(parsedOnSalePrice)) product.onSalePrice = parsedOnSalePrice;
        }

        if(parsedProductDetails){
            try{
                product.productDetails = JSON.parse(parsedProductDetails);
            }catch(e){
                console.error("Error Parsing Product Details! error:", e);
                return res.status(400).json({error: "Product Details Parsing Error"});
            }
        }

        await product.save();
        res.status(200).json(product);

    }catch(e){
        console.error("Error with editing product details: ", e);
        res.status(500).json({error: "Error with updating product details!"});
    }
};

module.exports = { fetch, addProduct, removeProduct, editProduct, fetchProductData };