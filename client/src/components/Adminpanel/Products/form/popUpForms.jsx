import React, { useEffect, useState } from 'react'
import { FaBold, FaUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md";


import "../form/popUpForms.css"

import { IoClose } from "react-icons/io5";


function Popup({showForm, setForm, activeProduct, setActiveProduct}) {

  const [productDetails, setProductDetails] = useState({
    _id:'',
    productName: '',
    description: '',
    productPrice: 0,
    onSale: false,
    onSalePrice: 0,
    productImages: []
  });

  {/* Format PRICE HANDLER */}
  const formatPrice = (price) => {
    if (price && typeof price === 'object' && price.$numberDecimal) {
        return parseFloat(price.$numberDecimal).toFixed(2);
    }
    return 'N/A';
  };
  
  {/* ONSALE HANDLER */}
  const [isOnSale, setIsOnSale] = useState(false);

  const handleOnSaleCheckbox = (event) => {
    const isChecked = event.target.checked;
    setIsOnSale(isChecked); // Update the state
  };



  useEffect(() => {
    if (showForm === 'editProduct' && activeProduct) {
      setProductDetails({
        productName: activeProduct.productName || '',
        description: activeProduct.description || '',
        productPrice: formatPrice(activeProduct.defaultPrice),
        onSale: activeProduct.onSale,
        onSalePrice: formatPrice(activeProduct.onSalePrice),
        productImages: activeProduct.productImages || []
      });
    }
  }, [showForm, activeProduct?._id]);




  const [imageToRemove, setImageToRemove] = useState([]);
  
  const handleRemoveImage = (imageUrl) => {
    if (!imageUrl) {
      console.error("imageUrl je undefined!");
      return;
    }
    setImageToRemove((prev) => [...prev, imageUrl]);
    console.log(imageToRemove);

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      productImages: prevDetails.productImages.filter(
        (img) => img !== imageUrl // Odstráni obrázok, ktorý sa zhoduje s imageUrl
      ),
    }));

    //console.log("PRODUCT IMAGES:", ...productDetails.productImages);

  };


// ===========================================================
// ==================== ADD PRODUCT START ====================
// ===========================================================

  {/* SUBMIT AddProduct HANDLER */}
  const submitFullForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    formData.set("onSale", formData.get("onSale") === "true");
    
    const imageInput = e.target.elements['productImages'];
    formData.delete('productImages');
    Array.from(imageInput.files).forEach(file => {
        formData.append('productImages', file);
    });

  
    fetch('http://localhost:3005/products/addProduct', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      window.location.reload();
      setForm(null);
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message);
    });
  };


  {/* ADD FORM */}
  const AddProduct = () => (
    <div className="formContnet">
      <div className="formHeader">
        <div className="textHeader">
          <h2>Pridať produkt</h2>
        </div>
        <div className="closeBTN" onClick={() => setForm(null)}>
          <IoClose className='icon' />
        </div>
      </div>

      <div className="formBody">
        <form onSubmit={submitFullForm}>
          {/* Názov produktu */}
          <input 
            type="text" 
            name='productName' 
            title='Product Name' 
            placeholder='Nazov Produktu'
            required 
          />

          {/* Cena produktu */}
          <input 
            type="number" 
            name='defaultPrice' 
            placeholder='Cena produktu' 
            min={0} 
            step={0.01} 
            required
          />

          {/* Checkbox Akcia produktu */}
          <div className="onSaleCheckBox">
            <label htmlFor="onSale">Je produkt v akcii</label>
            <input 
              type="checkbox"  
              name="onSale" 
              defaultChecked={productDetails.onSale}
              onChange={handleOnSaleCheckbox}
            />
          </div>

          {/* Cena produktu v akcii*/}
          {isOnSale && (
            <input 
              type="number" 
              name='onSalePrice' 
              placeholder='Cena produktu v zľave'
              defaultValue={productDetails.onSalePrice}  // Add this line
              min={0} 
              step={0.01} 
              required
            />
          )}

          {/* Popis produktu */}
          <textarea 
            type="text" 
            name="description" 
            title='Product Description' 
            placeholder='Popis Produktu...'
            required
          />

          {/* Obrazky produktu */}
          <div className='productImageInputContainer'>
            <input 
              id="file-input" 
              type="file" 
              name='productImages' 
              title='Product Images' 
              accept='image/*' 
              multiple
            />
            <label htmlFor="file-input">
              <FaUpload className='uploadIcon' /> 
              <span>Vyber obrázok</span>
            </label>
          </div>
          <button type='submit'> Pridať Produkt</button>
        </form>
      </div>
    </div>
  )

// ===========================================================
// ===================== ADD PRODUCT END =====================
// ===========================================================



// ===========================================================
// ==================== EDIT PRODUCT START ===================
// ===========================================================

  {/* EDIT HANDLER */}
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const imageInput = e.target.elements['productImages'];
    //console.log('IMAGE INPUT: ', imageInput)

    Array.from(imageInput.files).forEach(file => {
        formData.append('productImages', file);
    });

    const existingImages = productDetails.productImages;
    console.log('Exisisting images: ', existingImages);
    existingImages.forEach((image) => {
      formData.append('productImages', image);
    });
  
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    fetch(`http://localhost:3005/products/${activeProduct._id}/edit`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => {
        if (!response.ok) throw new Error('Update failed');
        return response.json();
      })
      .then(data => {
        //console.log('Success:', data);
        //console.log(`FORMDATA: `, formData);
        //window.location.reload();
        setForm(null);
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message);
      });
  };

  const EditProduct = () => (
    <div className="formContnet">
      <div className="formHeader">
        <div className="textHeader">
          <h2>Upraviť produkt</h2>
        </div>
        <div className="closeBTN" onClick={() => setForm(null)}>
          <IoClose className='icon' />
        </div>
      </div>
      
      <div className="formBody">
        <form onSubmit={handleEditSubmit}>
          
          {/* Názov produktu */}
          <input
            type="text"
            name="productName"
            defaultValue={productDetails.productName}
            placeholder="Názov produktu"
            required
          />

          {/* Popis produktu */}
          <textarea
            type="text"
            name="description"
            defaultValue={productDetails.description}
            placeholder="Popis produktu"
            required
          />

          {/* Základná cena */}
          <input
            type="number"
            name="defaultPrice"
            defaultValue={productDetails.productPrice}
            min="0"
            step="0.01"
            placeholder="Základná cena"
            required
          />

          {/* Checkbox Akcia produktu */}
          <div className="onSaleCheckBox">
            <label htmlFor="onSale">Je produkt v akcii</label>
            <input 
              type="checkbox"  
              name='onSale' 
              placeholder='v Akcii'
              checked={productDetails.onSale}
              onChange={handleOnSaleCheckbox}
            />
          </div>

          {/* Cena produktu v akcii*/}
          {isOnSale && (
            <input 
              type="number" 
              name='onSalePrice' 
              placeholder='Cena produktu v zľave' 
              min={0} 
              step={0.01} 
              required
            />
          )}

          {/* Obrazky produktu */}
          <div className='productImageInputContainer'>
            <input 
              id="file-input" 
              type="file" 
              name='productImages' 
              title='Product Images' 
              accept='image/*' 
              multiple
              required={productDetails.productImages.length === 0}
            />
            <label htmlFor="file-input">
              <FaUpload className='uploadIcon' /> 
              <span>Vyber obrázok</span>
            </label>
          </div>
          <div className="productGallery">
            {productDetails.productImages.map((image, index) => (
              <div key={index} className="imageWrapper">
                <img src={image} alt={`Produktový obrázok ${index + 1}`} className="productImage" />
                <div className="removeImage" onClick={() => handleRemoveImage(image)}><MdClose /></div>
              </div>
            ))}
          </div>

          <button type="submit">Uložiť zmeny</button>
        </form>
      </div>
    </div>
  )


// ===========================================================
// ==================== EDIT PRODUCT END =====================
// ===========================================================


// ===========================================================
// ================== REMOVE PRODUCT START ===================
// ===========================================================


  {/* DELETE HANDLER */}
  const handleDeleteProduct = async () => {
    if (!activeProduct?._id) return;
    
    try {
      await fetch(`http://localhost:3005/products/${activeProduct._id}/delete`, {
        method: 'DELETE'
      });
      
      setForm(null);
      setTimeout(() => {
        setActiveProduct(null);
        //window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    //console.log("Updated IMAGE TO REMOVE:", imageToRemove);
  }, [imageToRemove]);


  const RemoveProduct = () => (
    <div className="formContnet">
      <div className="formHeader">
        <div className="textHeader">
          <h2>Odstrániť produkt</h2>
        </div>
        <div className="closeBTN" onClick={() => setForm(null)}>
          <IoClose className='icon' />
        </div>
      </div>
      <div className="contentBox">
        <div className="text">
          <p>naozaj chcete odstrániť produkt:  <strong>{activeProduct.productName}</strong>  ? </p>
        </div>
        <div className="btns-box">
          <button type="accept" className='btn' onClick={handleDeleteProduct}>ANO</button>
          <button type="decline" className='btn' onClick={() => setForm(null)}>NIE</button>
        </div>
      </div>
    </div>
  )

// ===========================================================
// ==================== REMOVE PRODUCT END ===================
// ===========================================================

  function ActiveForm() {
    switch(showForm){
      case 'addProduct':
        return <AddProduct />;
      case 'editProduct':
        return <EditProduct />;
      case 'removeProduct':
        return <RemoveProduct />
      default:
        return null;
    }
  };

  if (!showForm){
    return null;
  }

  return (
    <div className="popUpBox">
      <div className="popUpInner">
        {ActiveForm()}
      </div>
    </div>
  )
}

export default Popup