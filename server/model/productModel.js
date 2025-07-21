const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;


const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },

    productDescription:{
        type: String,
        required: false
    },

    productImages:[
        {
          type: String,
          required: true
        }
    ],

    defaultPrice:{
        type: Decimal128,
        required: true
    },

    onSale:{
        type: Boolean,
        required: true
    },

    onSalePrice:{
        type: Decimal128,
        required: true
    },

    productType:{
        type: String,
        enum: ['kosacka', 'krovinorez', 'pila'],
        required: true
    },

    productDrive:{
      type: String,
      enum:['elektrika', 'aku', 'benzín'],
      required: true,
    },

    productDetails:{
      type: mongoose.Schema.Types.Mixed,
      required: false
    },

}, {collection: "Products"});


productSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.defaultPrice != null) {
      ret.defaultPrice = parseFloat(ret.defaultPrice.toString());
    }
    if (ret.onSalePrice != null) {
      ret.onSalePrice = parseFloat(ret.onSalePrice.toString());
    }
    return ret;
  }
});

module.exports = mongoose.model("Products", productSchema);