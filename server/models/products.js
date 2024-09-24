const mongoose = require('mongoose');
const Decimal128 = mongoose.Schema.Types.Decimal128;
const ObjectId = mongoose.Schema.Types.ObjectId;

const productStruct = new mongoose.Schema({
    //_id: {type: ObjectId},
    productName: {type: String},
    defaultPrice: {type: Decimal128},
    onSale: {type: Boolean},
    onSalePrice: {type: Decimal128},
    description: {type: String},
}, {collection: "Products"})

const productModel = mongoose.model("product", productStruct);
module.exports = productModel;
