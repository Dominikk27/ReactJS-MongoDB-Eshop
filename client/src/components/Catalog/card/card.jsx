import React from 'react'
import '../card/card.css'

import { FaStar, FaRegStar } from "react-icons/fa";

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
        <img src={product.productImages[0] || unknown} alt="" />
      </div>
      <div className="productCardContent">
        <div className="cardTitle">
          <h4>{product.productName}</h4>
        </div>
        <div className="starsBox">
          <FaStar className='icon'/>
          <FaStar className='icon'/>
          <FaStar className='icon'/>
          <FaRegStar className='icon'/>
          <FaRegStar className='icon'/>
        </div>
        <div className="cardDescription">
        {product.productDescription}
        </div>
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
        <div className="readMore">
          Zobraziť produkt
        </div>
      </div>
    </div>
  )
}

export default Card