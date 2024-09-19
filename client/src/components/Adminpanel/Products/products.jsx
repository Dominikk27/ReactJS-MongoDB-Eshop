import React from 'react'

import { useEffect, useState } from 'react';

import "../Products/products.css"
import ProductCardComponent from './productCard/productCard'



function ProductsComponent({products}) {
    
    const [activeForm, setActiveForm] = useState('addProduct');

    const [activeComponent, setActiveComponent] = useState('products');
    useEffect(() => {
    }, [products]);

  return (
    <div className="componentContainer">
        <div className="componentBody">
            {products.map(i =>(
                <ProductCardComponent
                    key = {i._id} 
                    productName = {i.productName}
                    defaultPrice = {i.defaultPrice}
                    description = {i.description}
                    />
            ))}
        </div>
    </div>
  )
}

export default ProductsComponent