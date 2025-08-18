import React, { useState } from 'react'

import "../productCard/productCard.css"

import { IoMdRemoveCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { AiFillTool } from "react-icons/ai";

import unknown from "../productCard/unknown.jpg"

function ProductCardComponent ({ product, setShowForm, setActiveProduct }) {

    if(!product) return null;

    const {
        productName,
        productDescription,
        defaultPrice,
        onSalePrice,
        productImages,
        onSale
    }= product;

  return (
    <div className="AP_productCard">
        <div className="AP_productImage">
            {productImages && productImages.length > 0 && productImages[0] ? (
                <img src={productImages[0]?.url} alt={productName} />
                ) : (
                <img src={unknown} alt="Obrázok sa nenašiel" />
            )}
        </div>
        <div className="AP_productContent">
           <div className="AP_productInfo">
                <div className="AP_productName">
                    <h3>{productName}</h3>
                </div>
                <div className="AP_productDescription">
                    <p>{productDescription}</p>
                </div>
                <div className={`AP_productPriceBox ${onSale ? 'isOnSale' : ''}`}>
                    <div className="AP_productNormalPrice AP_price">
                    {defaultPrice} €
                    </div>
                    {onSale && (
                        <div className="AP_productSalesPrice AP_price">
                            {onSalePrice} €
                        </div>
                    )}
                </div>
           </div>
            <div className="AP_productButtons">
                <ul className='AP_productButtonsList'>
                    <li className='AP_productButton' onClick={() => {
                        setActiveProduct(product);
                        setShowForm('editProduct');
                    }}><AiFillTool className='icon'/></li>
                    <li className='AP_productButton' onClick={() => {
                        setActiveProduct(product);
                        setShowForm('removeProduct');
                    }}><IoMdRemoveCircle className='icon'/></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductCardComponent