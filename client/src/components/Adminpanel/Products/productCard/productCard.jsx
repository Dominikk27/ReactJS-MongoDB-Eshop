import React from 'react'

import "../productCard/productCard.css"

import { IoMdRemoveCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPercentage } from "react-icons/fa";







import unknown from "../productCard/unknown.jpg"

function ProductCardComponent ({productName, defaultPrice, description}) {


    const formatPrice = (price) => {
        if (price && typeof price === 'object' && price.$numberDecimal) {
            return parseFloat(price.$numberDecimal).toFixed(2);
        }
        return 'N/A';
    };




  return (
    <div className="productCard">
        <div className="productImageSection">
            <div className="productImageBox">
                <img className='productImage' src={unknown} alt="" />
            </div>
        </div>
        <div className="productContent">
            <div className="productName">
                <h1>{productName}</h1>
            </div>

            <div className="productDescription">
                <p>{description}</p>
            </div>
            <div className="priceCheck">
                <h3 className='priceTag'>Cena: </h3>
                <h3 className="price">{formatPrice(defaultPrice)} €</h3>
            </div>

        </div>
        <div className="productButtonsSection">
            <div className="buttonsRow">
                <ul className="buttonsList">
                    <li className="button">
                        <IoSettingsSharp className='icon'/>
                    </li>
                    <li className="button">
                        <FaPercentage className='icon'/>
                    </li>
                    <li className="button">
                        <IoMdRemoveCircle className='icon'/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductCardComponent