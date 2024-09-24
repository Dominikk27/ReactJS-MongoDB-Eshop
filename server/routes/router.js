const express = require('express');
const productModel = require('../models/products');

const router = express.Router();



router.get('/products', async (req, res) => {
    try{
        const response = await productModel.find();
        return res.json({products : response});
    }catch (e){
        res.status(500).send("Error While fetching products" + e.message)
    }
});

router.post('/products/addProduct', async (req, res) => {
  try {
      const productData = req.body;

      if (!productData.productName || !productData.defaultPrice) {
          return res.status(400).json({ message: 'Product name and price are required.' });
      }

      const newProduct = new productModel(productData);
      await newProduct.save(); // Uloženie produktu do databázy

      res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;