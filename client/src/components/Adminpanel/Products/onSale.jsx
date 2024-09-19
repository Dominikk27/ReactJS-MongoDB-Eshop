import React from 'react'

import { useEffect, useState } from 'react';

import "../Products/onSale.css"
import ProductCardComponent from './productCard/productCard'

import { TiPlus } from "react-icons/ti";
import { MdRemoveShoppingCart } from "react-icons/md";

function OnSale ({products}) {
    
    
    const [activeComponent, setActiveComponent] = useState('products');

    useEffect(() => {
        console.log('Produkty APANEL:', products);
    }, [products]);

  return (
    <div className="componentContainer">

        <div className="componentBody">
            {products.map(i =>(
                <ProductCardComponent 
                    productName = {i.productName}
                    defaultPrice = {i.defaultPrice}
                    description = {i.description}
                    />
            ))}
        </div>
    </div>
  )
}

export default OnSale