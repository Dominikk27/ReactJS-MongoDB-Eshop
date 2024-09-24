import React, { useEffect, useState } from 'react'

import "../form/popUpForms.css"

import { IoClose } from "react-icons/io5";


function Popup({showForm, setForm, activeProduct, setActiveProduct}) {

  const [productDetails, setProductDetails] = useState({
    productName: '',
    description: '',
    productPrice: 0,
    onSale: false,
    onSalePrice: 0,
  });

  useEffect(() =>{
    if(showForm === 'editProduct'){
      setProductDetails({
        productName: activeProduct.productName || '',
        description: activeProduct.description || '',
        defaultPrice: formatPrice(activeProduct.defaultPrice) || 0,
        onSale: activeProduct.onSale || false,
        onSalePrice: formatPrice(activeProduct.onSalePrice) || 0,
      })
    }
    else{
      setProductDetails({
        productName: '',
        description: '',
        defaultPrice: 0,
        onSale: false,
        onSalePrice: 0,
      });
      setActiveProduct(null);
    }
  }, [showForm, activeProduct,  setActiveProduct]);



  const formatPrice = (price) => {
    if (price && typeof price === 'object' && price.$numberDecimal) {
        return parseFloat(price.$numberDecimal).toFixed(2);
    }
    return 'N/A';
  };



  
  const handleInsertData = async (newProductData) => {
    const { productName, defaultPrice, onSale, onSalePrice, description } = newProductData;

    if (!productName || isNaN(defaultPrice)) {
      //console.error("Product name and price are required.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3005/products/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName.trim(),
          defaultPrice: parseFloat(defaultPrice),
          onSale: onSale.trim(),
          onSalePrice: onSale === "true" ? parseFloat(onSalePrice) : undefined,
          description: description.trim(),
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData.message}`);
      }
  
      const data = await res.json();
      //console.log("Product SUCCESSFULLY ADDED!", data);
    } catch (e) {
      //console.error("ERROR WITH INSERTING DATA: ", e);
      console.error(e);
    }
  };
  

  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    payload.onSale = payload.onSale === "on" ? "true" : "false";

    //console.log(payload);
    handleInsertData(payload);
    setForm(null);
  }

  const AddProduct = () => (
    <div className="formContnet">
      <div className="header">
        <div className="textHeader">
          <h2>Pridať produkt</h2>
        </div>
        <div className="closeBTN" onClick={() => setForm(null)}>
          <IoClose className='icon' />
        </div>
      </div>

      <div className="formBody">
        <form onSubmit={submitProduct}>
          <input type="text" name='productName' title='Product Name' placeholder='Nazov Produktu' />
          <input type="text" name="description" title='Product Description' placeholder='Popis Produktu...'/>
          <input type="number" name='defaultPrice' placeholder='Cena produktu' min={0} step={0.01} />
          <input type="checkbox"  name='onSale' placeholder='v Akcii'/>
          <input type="number" name='onSalePrice' placeholder='Cena produktu v zľave' min={0} step={0.01} />
          <button type='submit'> Pridať Produkt</button>
        </form>
      </div>
    </div>
  )

  const EditProduct = () => (
    <div className="formContnet">
      <div className="header">
        <div className="textHeader">
          <h2>Upraviť produkt</h2>
        </div>
        <div className="closeBTN" onClick={() => setForm(null)}>
          <IoClose className='icon' />
        </div>
      </div>


      <div className="formBody">
        <form>
          <input type="text" name='productName' title='Product Name' placeholder='Nazov Produktu' value={productDetails.productName}/>
          <input type="text" name="productDescription" title='Product Description' placeholder='Popis Produktu...' value={productDetails.description}/>
          <input type="number" name='defaultPrice' placeholder='Cena produktu' min={0} step={0.01} value = {productDetails.productPrice}/>
          <button type='submit'> Upraviť Produkt</button>
        </form>
      </div>
    </div>
  )

  function CloseForm() {
  }

  function ActiveForm() {
    switch(showForm){
      case 'addProduct':
        return <AddProduct />;
      case 'editProduct':
        return <EditProduct />;
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