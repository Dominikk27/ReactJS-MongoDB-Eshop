import React, { useEffect, useState } from 'react'

import { FaBold, FaUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { useForm, FormProvider } from 'react-hook-form';


import "../form/popUpForms.css"
import ProductDetailsForm from "../form/utils/productDetails";
import { productDetailSchema } from './utils/productSchemas';


function Popup({ showForm, setForm, activeProduct, setActiveProduct }) {

  //const [selectedImages, setSelectedImages] = useState([]);

  const methods = useForm({
    shouldUnregister: false,
    defaultValues: {
      productDetails: {}
    }
  });
  
  const {
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    reset,
    formState: { isSubmitting }
  } = methods;


  //const watchedImages = watch('productImages');
  const onSale = watch('onSale');
  const productType = watch('productType');
  const productDrive = watch('productDrive');

  useEffect(() => {
    setValue("productDetails", {});
  }, [productType, productDrive]);


  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if(showForm === "editProduct" && activeProduct){
      reset({
        productName: activeProduct.productName,
        productDescription: activeProduct.productDescription,
        defaultPrice: activeProduct.defaultPrice,
        onSalePrice: activeProduct.onSalePrice,
        onSale: activeProduct.onSale
      });
      setOldImages(activeProduct.productImages)
      setNewImages([]);
    }
    if (showForm === "addProduct") {
      reset();
      //setSelectedImages([]);

      setOldImages([]);
      setNewImages([]); 
    }
  }, [showForm, activeProduct, reset]);
  
  const handleSelectedImages = (e) => {
    const files = Array.from(e.target.files);
    
    const preview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    console.log(preview);
    
    setNewImages(prev => [...prev, ...preview]);
  }

  const handleRemoveOldImage = (index) => {
    setOldImages(prev => {
      const updated = [...prev];
      const removed = updated.splice(index, 1);

      if(removed?.preview){
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const handleRemoveNewImage = (index) => {
    setNewImages(prev => {
      const updated = [...prev];
      const removed = updated.splice(index, 1);

      if(removed[0]?.preview){
        URL.revokeObjectURL(removed[0].preview);
      }
      return updated;
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
      console.log("Error with Removing product");
    }
  }

  function ActiveForm() {
    switch(showForm){
      case 'addProduct':
        return <AddProduct />;
      case 'editProduct':
        return <EditProduct />;
      case 'removeProduct':
        return <RemoveProduct />;
      default:
        return null;
    }
  };

  // ================== REMOVE PRODUCT START ===================
  const RemoveProduct = () => (
    <div className="mainFormContent">
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
    formData.append("productDrive", data.productDrive);
    formData.append("productType", data.productType);
    formData.append("productDetails", JSON.stringify(data.productDetails || {}));
    
    console.log("productDetails before sending:", data.productDetails);


    newImages.forEach(image => {
      formData.append("productImages", image.file);
    })

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
      console.log("Error: ", e);
    });


  };
  
  
  {/* ADD FORM */}
  const AddProduct = () => (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='formContainer'>
        <div className="formHeader">
          <div className="textHeader">
            <h2>Pridať produkt</h2>
          </div>
          <div className="closeBTN" onClick={() => setForm(null)}>
            <IoClose className='icon' />
          </div>
        </div>
        <div className="formsRow">
          <div className="mainFormContent formBody">
            {/* SELECT PRODUCT TYPE */}
            <div className="selectBox_Product">
              <select name="productType" 
                id="productType" 
                className="productType" 
                placeholder="test"
                {...register('productType', {required: true})}
                >
                <option value=""></option>
                <option value="pila">Píla</option>
                <option value="kosacka">Kosačka</option>
                <option value="krovinorez">Krovinorez</option>
              </select>
              <label htmlFor="productType">
                  <span>Typ produktu</span>
              </label>
            </div>

            {/* Product Name */}
            <input 
              type="text" 
              name='productName' 
              title='Product Name' 
              placeholder='Nazov Produktu'
              {...register('productName', {required: true})}
            />

            {/* Default Price */}
            <input 
              type="number" 
              name='defaultPrice' 
              placeholder='Cena produktu' 
              min={0} 
              step={0.01} 
              {...register('defaultPrice', {required: true})}
            />

            {/* Checkbox On Sale */}
            <div className="onSaleCheckBox">
              <label htmlFor="onSale">Je produkt v akcii</label>
              <input 
                type="checkbox"  
                {...register('onSale')} 
              />
            </div>

            {/* On Sale Price */}
            {onSale ? 
            
              <input 
                type="number" 
                name='onSalePrice' 
                placeholder='Cena produktu v zľave'
                min={0} 
                step={0.01} 
                {...register('onSalePrice', {required: true})}
              />
              :null
            }

            {/* Product Description */}
            <textarea 
              type="text" 
              name="productDescription" 
              title='Product Description' 
              placeholder='Popis Produktu...'
              {...register('productDescription', {required: true})}
            />

            {/* SELECT PRODUCT DRIVE */}
            <div className="selectBox_Product">
              <select name="productDrive" 
              id="productDrive" 
              className="productDrive" 
              placeholder="pohon"
              {...register('productDrive', {required: true})}>
                <option value=""></option>
                <option value="aku">AKU</option>
                <option value="elektro">Elektrika</option>
                <option value="benzin">Benzín</option>
              </select>
              <label htmlFor="productType">
                  <span>Pohon </span>
              </label>
            </div>

            {/* Product Images Box */}
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
              {newImages.map((image, index) => (
                <div key={index} className="imageWrapper">
                  <img src={image.preview} alt={`Produktový obrázok ${index + 1}`} className="productImage" />
                  <div className="removeImage" onClick={() => handleRemoveNewImage(index)}><MdClose /></div>
                </div>
              ))}
            </div>
          </div>
          {productType && productDrive && (
          <div className="detailsFormContent">
            <div className="formHeader">
              <div className="textHeader">
                <h2>Detaily produkt</h2>
              </div>
            </div>

            <div className="formBody">
              <ProductDetailsForm
                productType={watch("productType")}
                productDrive={watch("productDrive")}
              />
            </div>
          </div>
          )}

        </div>
        <div className="formsButton">
          <button type='submit'> Pridať Produkt</button>
        </div>
      </form>
    </FormProvider>
  )

  // ==================== EDIT PRODUCT ====================

  {/* SUBMIT Edit HANDLER */}
  const onEditSubmit = (data) => {

    console.log("EDIT!");
    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("defaultPrice", data.defaultPrice);
    formData.append("onSale", data.onSale || false);
    formData.append("onSalePrice", data.onSalePrice);
    formData.append("productDescription", data.productDescription);

    formData.append("oldImages", JSON.stringify(oldImages));

    newImages.forEach(image => {
      formData.append("productImages", image.file);
    });


    fetch(`http://localhost:3005/products/api/adminpanel/editProduct/${activeProduct._id}`, {
      method: 'PUT',
      body: formData
    })
    .then(res => {
      if(!res.ok) throw new Error("Upload failed!");
      return res.json();
    })
    .then(data => {
      console.log("Success: ", data);
      setForm(null);
      setActiveProduct(null);
      window.location.reload();
    })
    .catch(e => {
      alert.error(e.message);
    });


  };


  const EditProduct = () => (
    <div className="mainFormContent">
      <div className="formHeader">
        <div className="textHeader">
          <h2>Upraviť produkt</h2>
        </div>
        <div className="closeBTN" onClick={() => setForm(null)}>
          <IoClose className='icon' />
        </div>
      </div>
      
      <div className="formBody">
        <form onSubmit={handleSubmit(onEditSubmit)}>
          
          {/* Product Name */}
          <input
            type="text"
            name="productName"
            {...register("productName", {required: true})}
            placeholder="Názov produktu"
          />

          {/* Product Description */}
          <textarea
            type="text"
            name="description"
            {...register("productDescription", {required: true})}
            placeholder="Popis produktu"
          />

          {/* Default Price */}
          <input
            type="number"
            name="defaultPrice"
            {...register("defaultPrice", {required: true})}
            min="0"
            step="0.01"
            placeholder="Základná cena"
          />

          {/* Checkbox Product On Sale */}
          <div className="onSaleCheckBox">
            <label htmlFor="onSale">Je produkt v akcii</label>
            <input 
              type="checkbox"  
              name='onSale' 
              placeholder='v Akcii'
              {...register("onSale", {required: false})}
            />
          </div>

          {/* On Sale Price */}
          { onSale ?
              <input 
                type="number" 
                name='onSalePrice' 
                placeholder='Cena produktu v zľave'
                {...register("onSalePrice", {required: true})} 
                min={0} 
                step={0.01}
              />
              :null
          }

          {/* Product Images Button */}
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
            {/* Old Images */}
            {oldImages.map((image, index) => (
              <div key={`old-${index}`} className="imageWrapper">
                <img src={image} alt={`Produktový obrázok ${index + 1}`} className="productImage" />
                <div className="removeImage" onClick={() => handleRemoveOldImage(index)}><MdClose /></div>
              </div>
            ))}
            
            {/* New Images */}
            {newImages.map((image, index) => (
              <div key={index} className="imageWrapper">
                <img src={image.preview} alt={`Produktový obrázok ${index + 1}`} className="productImage" />
                <div className="removeImage" onClick={() => handleRemoveNewImage(index)}><MdClose /></div>
              </div>
            ))}
          </div>

          <button type="submit">Uložiť zmeny</button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="popUpBox">
      <div className={`popUpInner ${productType && productDrive ? 'showDetails' : ''}`}>
        {ActiveForm()}
      </div>
    </div>
  )
}

export default Popup