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

  const productMethods = useForm({
    shouldUnregister: false,
    defaultValues: showForm === "editProduct" && activeProduct ? {
      productDetails: activeProduct.productDetails,
      productType: activeProduct.productType,
      productDrive: activeProduct.productDrive,
      productName: activeProduct.productName,
      productDescription: activeProduct.productDescription,
      defaultPrice: activeProduct.defaultPrice,
      onSalePrice: activeProduct.onSalePrice,
      onSale: activeProduct.onSale
    } : {
      productDetails: {},
      productType: "",
      productDrive: "",
      onSale: false
    }
  });

  const reservationMethods = useForm({
    shouldUnregister: true,
    defaultValues: {
      FName: "",
      LName: "",
      phoneNumber: "",
      email: "",
      reservationDate: "",
      reservationTime: "",
      reservationNote: "",
      productCode: activeProduct?._id || ""
    }

  })

  const {
    register: registerProduct, 
    handleSubmit: handleSubmitProduct, 
    setValue: setValueProduct, 
    watch: watchProduct, 
    reset: resetProduct,
    formState: { isSubmitting: isProductSubmitting }
  } = productMethods;

  const {
    register: registerReservation,
    handleSubmit: handleSubmitReservation,
    watch: watchReservation,
    reset: resetReservation,
    formState: { isSubmitting: isReservationSubmitting }
  } = reservationMethods


  //const watchProductedImages = watchProduct('productImages');
  const onSale = watchProduct('onSale');
  const productType = watchProduct('productType');
  const productDrive = watchProduct('productDrive');


  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if(showForm === "editProduct" && activeProduct){
      resetProduct({
        productName: activeProduct.productName,
        productDescription: activeProduct.productDescription,
        defaultPrice: activeProduct.defaultPrice,
        onSalePrice: activeProduct.onSalePrice,
        onSale: activeProduct.onSale,
        productType: activeProduct.productType,
        productDrive: activeProduct.productDrive,
        productDetails: activeProduct.productDetails || {}
      });
      setOldImages(activeProduct.productImages)
      setNewImages([]);
    }
    if (showForm === "addProduct") {
      resetProduct();
      //setSelectedImages([]);

      setOldImages([]);
      setNewImages([]); 
    }
  }, [showForm, activeProduct, resetProduct]);
  
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
      case 'reserveProduct':
        return <ReserveProduct />;
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
    
    //console.log("productDetails before sending:", data.productDetails);


    newImages.forEach(image => {
      formData.append("productImages", image.file);
    })

    fetch('http://localhost:3005/products/api/adminpanel/addProduct', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if(!res.ok){
        console.error("Upload failed!");
        throw new Error("Upload failed!");
        
      }
      return res.json();
    })
    .then(data => {
      console.log("Success: ", data);
      resetProduct();
      setForm(null);
      window.location.reload();
    })
    .catch(e => {
      console.error("Error: ", e);
    });


  };
  
  
  {/* ADD FORM */}
  const AddProduct = () => (
    <FormProvider {...productMethods}>
      <form onSubmit={handleSubmitProduct(onSubmit)} className='formContainer'>
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
                {...registerProduct('productType', {required: true})}
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
              {...registerProduct('productName', {required: true})}
            />

            {/* Default Price */}
            <input 
              type="number" 
              name='defaultPrice' 
              placeholder='Cena produktu' 
              min={0} 
              step={0.01} 
              {...registerProduct('defaultPrice', {required: true})}
            />

            {/* Checkbox On Sale */}
            <div className="onSaleCheckBox">
              <label htmlFor="onSale">Je produkt v akcii</label>
              <input 
                type="checkbox"  
                {...registerProduct('onSale')} 
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
                {...registerProduct('onSalePrice', {required: true})}
              />
              :null
            }

            {/* Product Description */}
            <textarea 
              type="text" 
              name="productDescription" 
              title='Product Description' 
              placeholder='Popis Produktu...'
              {...registerProduct('productDescription', {required: true})}
            />

            {/* SELECT PRODUCT DRIVE */}
            <div className="selectBox_Product">
              <select name="productDrive" 
              id="productDrive" 
              className="productDrive" 
              placeholder="pohon"
              {...registerProduct('productDrive', {required: true})}>
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
                productType={watchProduct("productType")}
                productDrive={watchProduct("productDrive")}
              />
            </div>
          </div>
          )}

        </div>
        <div className="formsButton">
          <button type='submit' disabled={isProductSubmitting}> Pridať Produkt</button>
        </div>
      </form>
    </FormProvider>
  )

  // ==================== EDIT PRODUCT ====================

  {/* SUBMIT Edit HANDLER */}
  const onEditSubmit = (data) => {

    //console.log("EDIT!");
    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("defaultPrice", data.defaultPrice);
    formData.append("onSale", data.onSale || false);
    formData.append("onSalePrice", data.onSalePrice);
    formData.append("productDescription", data.productDescription);
    formData.append("productDrive", data.productDrive);
    formData.append("productType", data.productType);
    formData.append("productDetails", JSON.stringify(data.productDetails || {}));

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
      console.error(e.message);
    });
  };

  const EditProduct = () => (
    <FormProvider {...productMethods}>
      <form onSubmit={handleSubmitProduct(onEditSubmit)} className="formContainer">
        <div className="formHeader">
          <div className="textHeader">
            <h2>Upraviť produkt</h2>
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
                placeholder="productType"
                {...registerProduct('productType', {required: true})}
                value={watchProduct("productType") || ""}
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
              name="productName"
              {...registerProduct("productName", {required: true})}
              placeholder="Názov produktu"
            />

            {/* Default Price */}
            <input 
              type="number" 
              name='defaultPrice' 
              placeholder='Cena produktu' 
              min={0} 
              step={0.01} 
              {...registerProduct('defaultPrice', {required: true})}
            />

            {/* Checkbox On Sale */}
            <div className="onSaleCheckBox">
              <label htmlFor="onSale">Je produkt v akcii</label>
              <input 
                type="checkbox"  
                {...registerProduct('onSale')} 
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
                {...registerProduct('onSalePrice', {required: true})}
              />
              :null
            }

            {/* Product Description */}
            <textarea 
              type="text" 
              name="productDescription" 
              title='Product Description' 
              placeholder='Popis Produktu...'
              {...registerProduct('productDescription', {required: true})}
            />

            {/* SELECT PRODUCT DRIVE */}
            <div className="selectBox_Product">
              <select name="productDrive" 
                id="productDrive" 
                className="productDrive" 
                placeholder="pohon"
                {...registerProduct('productDrive', {required: true})}
                value={watchProduct("productDrive") || ""}
              >
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
                productType={productType}
                productDrive={productDrive}
              />
            </div>
          </div>
          )}

        </div>
        <div className="formsButton">
          <button type='submit' disabled={isProductSubmitting}> Upraviť Produkt</button>
        </div>
      </form>
    </FormProvider>
  )

  // ==================== RESERVE PRODUCT ====================
  const onReservationSubmit = async (data) =>{
    const reservationData = {
      FName: data.FName,
      LName: data.LName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      reservationDate: data.reservationDate,
      reservationTime: data.reservationTime,
      reservationNote: data.reservationNote,
      productCode: data.productCode
    };

    console.log("reservation data: ", reservationData)

    try {
      const response = await fetch('http://localhost:3005/client/reservations/reserveProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error("Rezervácia zlyhala");
      }

      const result = await response.json();
      console.log("Rezervácia úspešná:", result);
      setForm(null);
    } catch (error) {
      console.error("Chyba pri rezervácii:", error);
    }
  }

  const ReserveProduct = () => (
    <FormProvider {...reservationMethods}>
      <form onSubmit={handleSubmitReservation(onReservationSubmit)} className="formContainer">
        <div className="formHeader">
          <div className="textHeader">
            <h2>Rezervovať produkt</h2>
          </div>
          <div className="closeBTN" onClick={() => setForm(null)}>
            <IoClose className='icon' />
          </div>
        </div>
        {/* ProductCode */}
        <input
          type="text"
          name="productCode"
          defaultValue={activeProduct._id}
          {...registerReservation("productCode", {required: true})}
          placeholder="productCode"
          readOnly
        />
        <div className="consumerFormFullNameBox">
          {/* Consumer FName */}
          <input
            type="text"
            name="FName"
            {...registerReservation("FName", {required: true})}
            placeholder="Meno"
          />
          {/* Consumer LName */}
          <input
            type="text"
            name="LName"
            {...registerReservation("LName", {required: true})}
            placeholder="Priezvisko"
          />
        </div>
        {/* Phone Number */}
        <input
          type="tel"
          name="phoneNumber"
          {...registerReservation("phoneNumber", {required: true})}
          placeholder="Telefónne číslo"
        />
        {/* Email */}
        <input
          type="email"
          name="email"
          {...registerReservation("email", {required: true})}
          placeholder="Email"
        />
        <div className="reservationDateTimeBox">
          {/* Reservation Date */}
          <input
            type="date"
            name="reservationDate"
            {...registerReservation("reservationDate", {required: true})}
            placeholder="Dátum Rezervácie"
          />
          {/* Reservation Time */}
          <input
            type="time"
            name="reservationTime"
            {...registerReservation("reservationTime", {required: true})}
            placeholder="Čas Rezervácie"
          />
        </div>
        {/* Poznámka */}
        <textarea
          type="text"
          name="reservationNote"
          {...registerReservation("reservationNote", {required: true})}
          placeholder="Poznámka k rezervácii"
        />
        <div className="formsButton">
          <button type='submit' disabled={isReservationSubmitting}> Rezervovať produkt</button>
        </div>
      </form>
    </FormProvider>
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


/* const onReservationSubmit = async (data) =>{
    const reservationData = {
      FName: data.FName,
      LName: data.LName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      reservationDate: data.reservationDate,
      reservationTime: data.reservationTime,
      reservationNote: data.reservationNote,
      productCode: data.productCode
    };

    console.log("reservation data: ", reservationData)

    try {
      const response = await fetch('http://localhost:3005/client/reservations/reserveProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error("Rezervácia zlyhala");
      }

      const result = await response.json();
      console.log("Rezervácia úspešná:", result);
      setForm(null);
    } catch (error) {
      console.error("Chyba pri rezervácii:", error);
    }
  } */