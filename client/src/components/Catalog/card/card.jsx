import React from 'react'
import '../card/card.css'

import { FaStar, FaRegStar, FaPercentage } from "react-icons/fa";

import testImage from '../card/image/pila.jpg'

import unknown from "../card/image/unknown.jpg"

const Card = ({ product }) => {


  const formatPrice = (price) => {
    if (price && typeof price === 'object' && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);  
    }
    return price; 
  };

  return (
    <div className="productCardBox">
      <div className="cardImage">
        {product.onSale ?
        <div className="floatingTag">
          <FaPercentage className='icon'/> <p className='tagType'>Zľava</p>
        </div> : null}
        <img src={product.productImages[0] || unknown} alt="" />
      </div>
      <div className="productCardContent">
        <div className="cardTextContent">
          <div className="cardTitle">
            <h4>{product.productName}</h4>
          </div>
          <div className="cardDescription">
            <p>{product.productDescription}</p>
          </div>
        {/*<div className="starsBox">
            <FaStar className='icon fullStar'/>
            <FaStar className='icon fullStar'/>
            <FaStar className='icon fullStar'/>
            <FaRegStar className='icon'/>
            <FaRegStar className='icon'/>
          </div> */}
          <div className="cardPrice">
            {product.OnSale ? (
                <>
                  <h4 className="originalPrice">{formatPrice(product.defaultPrice)} €</h4>
                  <h4 className="salePrice">{formatPrice(product.onSalePrice)} €</h4>
                </>
              ) : (
                <h4>{formatPrice(product.defaultPrice)} €</h4>
              )}
          </div>
        </div>
        <div className="readMore">
          <button className="showBTN">
            Zobraziť produkt
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card