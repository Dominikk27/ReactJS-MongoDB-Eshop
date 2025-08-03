import React from 'react'
import Popup from './form/popUpForms.jsx'

import { useEffect, useState } from 'react';

import { MdAdd } from "react-icons/md";

import "../Products/products.css"
import ProductCardComponent from './productCard/productCard'



function ProductsComponent({products}) {
  const [localProducts, setLocalProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  const [showForm, setShowForm] = useState(null);

  useEffect(() => {
    if(products && products.length > 0) {
      setLocalProducts(products);
    } else {
      setLocalProducts([]);
    }
  }, [products]);


  const handleAddProduct = (newProduct) => {
    setLocalProducts(prev => [...prev, newProduct]);
    setShowForm(null);
  }

  return (
    <div className="productsBox">
      <div className="sectionHeader">
        <h3>Products</h3>
      </div>
      <div className="productsList_Buttons">
        <button className="product_actionButton" onClick={
          () => {
            setShowForm('addProduct');
          }
        }>
            <MdAdd className='icon'/> Add Product
          </button>
      </div>
      <div className="productsList">
        {localProducts.length > 0 ? (
          localProducts.map(product => (
            <ProductCardComponent
              key={product._id}
              product={product}
              setShowForm={setShowForm}
              setActiveProduct={setActiveProduct} 
            />
          ))
        ) : (<p>Products not found!</p>)}
      </div>
      {showForm && (
        <Popup
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
          showForm={showForm}
          setForm={setShowForm}
        />
      )}
    </div> 
  )
}

export default ProductsComponent