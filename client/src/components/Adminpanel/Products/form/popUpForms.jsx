import React, { useEffect, useState } from 'react'
import { FaBold, FaUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { useForm } from 'react-hook-form';


import "../form/popUpForms.css"

import { IoClose } from "react-icons/io5";


function Popup({ showForm, setForm, activeProduct, setActiveProduct }) {

  const {register, handleSubmit, setValue, watch, reset} = useForm();

  const [selectedImages, setSelectedImages] = useState([]);

  const watchedImages = watch('productImages');
  
  const handleSelectedImages = (e) => {
    const files = Array.from(e.target.files);
    
    const preview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setSelectedImages(preview);
    setValue('productImages', files)
  }

  const handleRemoveImage = (imgIndexToRemove) => {
    setSelectedImages(prev => {
      const updatePreview = [...prev];
      const target = updatePreview.splice(imgIndexToRemove, 1);

      if (target[0]?.preview){
        URL.revokeObjectURL(target[0].preview);
      }

      const updatedFiles = updatePreview.map((image) => image.file);
      setValue('productImages', updatedFiles);

      return updatePreview;

    });
  };

  const handleRemoveProduct = async () => {
    if(!activeProduct._id) return;

    try {
      await fetch(`http://localhost:3005/products/api/adminpanel/deleteProduct/${activeProduct._id}`, {
        method: 'DELETE'
      });

      setForm(null);
      setActiveProduct(null);

    }catch(e){
      console.error("DELETING PRODUCT FAILED!: ",e);
      alert("Error with Removing product");
    }
  }


  function ActiveForm() {
    switch(showForm){
      case 'addProduct':
        return <AddProduct />;
      case 'editProduct':
        return null;
      case 'removeProduct':
        return <RemoveProduct />;
      default:
        return null;
    }
  };


  // ================== REMOVE PRODUCT START ===================
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
            <button type="accept" className='btn' onClick={handleRemoveProduct}>ANO</button>
            <button type="decline" className='btn' onClick={() => setForm(null)}>NIE</button>
          </div>
        </div>
      </div>
    )

  // ==================== ADD PRODUCT ====================

  
    {/* SUBMIT AddProduct HANDLER */}
    const onSubmit = (data) => {
      const formData = new FormData();

      formData.append("productName", data.productName);
      formData.append("defaultPrice", data.defaultPrice);
      formData.append("onSale", data.onSale || false);
      formData.append("onSalePrice", data.onSalePrice);
      formData.append("productDescription", data.productDescription);

      if(data.productImages) {
        data.productImages.forEach(file => formData.append("productImages", file));
      }

      fetch('http://localhost:3005/products/api/adminpanel/addProduct', {
        method: 'POST',
        body: formData
      })
      .then(res => {
        if(!res.ok) throw new Error("Upload failed!");
        return res.json();
      })
      .then(data => {
        console.log("Success: ", data);
        reset();
        setForm(null);
        window.location.reload();
      })
      .catch(e => {
        alert.error(e.message);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Názov produktu */}
            <input 
              type="text" 
              name='productName' 
              title='Product Name' 
              placeholder='Nazov Produktu'
              {...register('productName', {required: true})}
            />
  
            {/* Cena produktu */}
            <input 
              type="number" 
              name='defaultPrice' 
              placeholder='Cena produktu' 
              min={0} 
              step={0.01} 
              {...register('defaultPrice', {required: true})}
            />
  
            {/* Checkbox Akcia produktu */}
            <div className="onSaleCheckBox">
              <label htmlFor="onSale">Je produkt v akcii</label>
              <input 
                type="checkbox"  
                {...register('onSale')} 
              />
            </div>
  
            {/* Cena produktu v akcii*/}
            
            <input 
              type="number" 
              name='onSalePrice' 
              placeholder='Cena produktu v zľave'
              min={0} 
              step={0.01} 
              {...register('onSalePrice', {required: true})}
            />
    
  
            {/* Popis produktu */}
            <textarea 
              type="text" 
              name="productDescription" 
              title='Product Description' 
              placeholder='Popis Produktu...'
              {...register('productDescription', {required: true})}
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
                onChange={handleSelectedImages}
              />
              <label htmlFor="file-input">
                <FaUpload className='uploadIcon' /> 
                <span>Vyber obrázok</span>
              </label>
            </div>
            <div className="productGallery">
              {selectedImages.map((image, index) => (
                <div key={index} className="imageWrapper">
                  <img src={image.preview} alt={`Produktový obrázok ${index + 1}`} className="productImage" />
                  <div className="removeImage" onClick={() => handleRemoveImage(index)}><MdClose /></div>
                </div>
              ))}
            </div>

            <button type='submit'> Pridať Produkt</button>
          </form>
        </div>
      </div>
    )

  return (
    <div className="popUpBox">
      <div className="popUpInner">
        {ActiveForm()}
      </div>
    </div>
  )
}

export default Popup