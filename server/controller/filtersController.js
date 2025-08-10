const Product = require("../model/productModel.js");

const getFilters = async (req, res) =>{
    try{
        const productDrives = await Product.distinct("productDrive");
        const productTypes = await Product.distinct("productType");
        const productBrands = await Product.distinct("productBrand");

        res.status(200).json({
            productTypes,
            productDrives,
            productBrands,
        });
    }catch(e){
        console.error("Failed to get product filters! error", e);
        res.status(500).json({ error: "Failed to get product filters!"});
    }

}

module.exports = { getFilters }