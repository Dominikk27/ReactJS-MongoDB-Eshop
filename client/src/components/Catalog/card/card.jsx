import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../card/card.css'

import { FaStar, FaRegStar, FaPercentage } from "react-icons/fa";

import testImage from '../card/image/pila.jpg'

import unknown from "../card/image/unknown.jpg"

const Card = ({ product }) => {

  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price && typeof price === 'object' && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);  
    }
    return price; 
  };

  const clickOnProduct = () =>{
      console.log("product id: ", product._id);
      navigate(`/catalog/product/${product._id}`);
  }

  return (
    <div className="productCardBox" onClick={clickOnProduct}>
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
            {product.onSale ? (
                <>
                  <div className="defaultPriceBox">
                    <div className={product.onSale ? 'small-diagonal-line' : ''}>
                      <h4 className="originalPrice oldPrice">{formatPrice(product.defaultPrice)} €</h4>
                    </div>
                  </div>
                  <div className="onSalePriceBox">
                    <h4 className="salePrice">{formatPrice(product.onSalePrice)} €</h4>
                  </div>
                </>
              ) : (
                <h4>{formatPrice(product.defaultPrice)} €</h4>
              )}
          </div>
        </div>
        <div className="readMore">
          <button className="showBTN" onClick={()=> console.log("HJELLO!")}>
            Zobraziť produkt
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card