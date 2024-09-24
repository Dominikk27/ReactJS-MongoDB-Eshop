import React from 'react'

import { useEffect, useState } from 'react';

import "../Products/products.css"
import ProductCardComponent from './productCard/productCard'



function ProductsComponent({products, onEdit}) {

  const handleEditProduct = (products) => {
    onEdit({formType: 'editProduct', productDetails: products })
  }
  
  const getProductPrice = (products) => {
    return products.onSale === 'true' ? products.onSalePrice : products.defaultPrice;
  };

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
                    productPrice = {getProductPrice(i)}
                    description = {i.description}
                    onEditProduct = {() => onEdit(i)}
                    />
            ))}
        </div>
    </div>
  )
}

export default ProductsComponent