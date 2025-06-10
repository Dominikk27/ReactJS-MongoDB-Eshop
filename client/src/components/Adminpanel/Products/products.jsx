import React from 'react'

import { useEffect, useState } from 'react';

import { MdAdd } from "react-icons/md";

import { FaTrashAlt } from "react-icons/fa";

import "../Products/products.css"
import ProductCardComponent from './productCard/productCard'



function ProductsComponent({products}) {

  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    if(products && products.length != null) {
      setLocalProducts(products);
    }
  },[products]);

  return (
    <div className="productsListBox">
      <div className="productsList_Buttons">
        <button className="product_actionButton">
            <MdAdd className='icon'/> Add Product
          </button>
          <button className="product_actionButton">
            <FaTrashAlt className='icon'/> Remove Product
          </button>
      </div>
      <div className="productsList">
        {localProducts.length > 0 ? (
          localProducts.map(product => (
            <ProductCardComponent
              key={product._id}
              product={product} 
            />
          ))
        ) : (<p>Products not found!</p>)}
      </div>
    </div>
  )
}

export default ProductsComponent