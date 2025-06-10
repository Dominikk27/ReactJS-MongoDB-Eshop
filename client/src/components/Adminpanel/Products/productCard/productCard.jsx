import React, { useState } from 'react'

import "../productCard/productCard.css"

import { IoMdRemoveCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPercentage } from "react-icons/fa";







import unknown from "../productCard/unknown.jpg"

function ProductCardComponent ({product}) {

    if(!product) return null;

    const {
        productName,
        productDescription,
        productPrice,
        productSalePrice,
        productImages
    }= product;

    console.log("Images:", productImages);
    const isOnSale = productSalePrice && productSalePrice > 0 && productSalePrice < productPrice;

  return (
    <div className="AP_productCard">
        <div className="AP_productImage">
            {productImages && productImages.length > 0 && productImages[0] ? (
                <img src={productImages[0]} alt={productName} />
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
                <div className={`AP_productPriceBox ${isOnSale ? 'isOnSale' : ''}`}>
                    <div className="AP_productNormalPrice AP_price">
                    {productPrice.toFixed(2)}
                    </div>
                    {isOnSale && (
                        <div className="AP_productSalesPrice AP_price">
                            {productSalePrice.toFixed(2)}
                        </div>
                    )}
                </div>
           </div>
            <div className="AP_productButtons">
                <ul className='AP_productButtonsList'>
                    <li className='AP_productButton'><FaPercentage className='icon'/></li>
                    <li className='AP_productButton'><IoMdRemoveCircle className='icon'/></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductCardComponent