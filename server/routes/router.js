const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const productModel = require('../models/products');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    //console.log('Setting filename for:', file.originalname);
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //console.log('Checking file type for:', file.originalname);
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Iba formáty jpeg|jpg|png|gif sú povolené!'));
  }
}).array('productImages');

router.post('adminpanel/products/addProduct', (req, res) => {

  upload(req, res, async (err) => {
    if (err) {
      //console.log('Error during upload:', err.message);
      return res.status(400).json({ message: err.message });
    }

    try {
      const { productName, defaultPrice, description, onSale, onSalePrice } = req.body;
      //console.log('Extracted form data:', { productName, defaultPrice, description, onSale, onSalePrice });
      
      if (!productName || !defaultPrice) {
        return res.status(400).json({ message: 'Názov a cena sú povinné polia' });
      }

      const productImages = req.files?.map(file => 
        `${req.protocol}://${req.get('host')}/images/${file.filename}`
      ) || [];
      //console.log('Product images:', productImages); // Debugging log

      const newProduct = new productModel({
        productName,
        defaultPrice,
        description,
        onSale: onSale === 'true',
        onSalePrice: onSale === 'true' ? onSalePrice : undefined,
        productImages
      });

      await newProduct.save();
      //console.log('Product saved successfully:', newProduct); // Debugging log

      res.status(201).json({ 
        message: 'Product added successfully',
        product: newProduct
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: 'BACKEND ERROR WITH ADDING PRODUCT!' });
    }
  });
});


router.get('/adminpanel/products', async (req, res) => {
    try{
        const response = await productModel.find();
        return res.json({products : response});
    }catch (e){
        res.status(500).send("Error While fetching products" + e.message)
    }
});


// GET konkrétny produkt
router.get('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
  // DELETE produkt + vymazanie obrázka
  router.delete('/products/:id/delete', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        // Odstránenie všetkých obrázkov produktu
        if (product.productImages && product.productImages.length > 0) {
            product.productImages.forEach(imageUrl => {
                const filename = path.basename(imageUrl);
                const imagePath = path.join(__dirname, '..', 'images', filename);
                
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Chyba pri mazaní obrázka:', err);
                        } else {
                            console.log(`Obrázok ${filename} bol odstránený.`);
                        }
                    });
                }
            });
        }
        
        await productModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produkt a jeho obrázky boli odstránené' });

    } catch (error) {
        console.error('Chyba pri mazaní produktu:', error);
        res.status(500).json({ message: 'Chyba servera pri mazaní produktu' });
    }
  });
  


  // UPDATE produkt
  router.put('/products/:id/edit', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message });
      }
  
      try {
        const { id } = req.params;
        const { removedImages, ...productData } = req.body;
  
        // Deserializácia removedImages
        let parsedRemovedImages = [];
        if (removedImages) {
          try {
            parsedRemovedImages = JSON.parse(removedImages);
          } catch (parseError) {
            console.error("Error parsing removedImages:", parseError);
            return res.status(400).json({ message: "Invalid removedImages format" });
          }
        }
  
        console.log("Removed Images:", parsedRemovedImages);
        console.log("Product Data:", productData);
        console.log("Files:", req.files);
  
        // Odstránenie starých obrázkov
        if (parsedRemovedImages && parsedRemovedImages.length > 0) {
          await Promise.all(
            parsedRemovedImages.map(async (imageUrl) => {
              const filename = path.basename(imageUrl);
              const filePath = path.join(__dirname, '..', 'images', filename);
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); //REMOVE IMAGES
              }
            })
          );
        }
  
        if (req.files && req.files.length > 0) {
          productData.productImages = req.files.map(
            (file) => `${req.protocol}://${req.get('host')}/images/${file.filename}`
          );
        } else {
          productData.productImages = productData.productImages || [];
        }
  
        const updatedProduct = await productModel.findByIdAndUpdate(
          id,
          productData,
          { new: true, runValidators: true }
        );
  
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Produkt nebol nájdený' });
        }
  
        res.json({ message: 'Produkt bol úspešne aktualizovaný', product: updatedProduct });
      } catch (error) {
        console.error('Chyba pri aktualizácii produktu:', error);
        res.status(500).json({ message: 'Chyba servera pri aktualizácii produktu' });
      }
    });
  });

module.exports = router;