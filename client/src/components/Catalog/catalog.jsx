import React, { useEffect, useState } from 'react'
import '../Catalog/catalog.css'
import Card from '../Catalog/card/card'

const Catalog = ({ products = [] }) => {
  //const [products, setProducts] = useState([]);

  return (
    <div>
        <div className="container">
          <div className="header">
            <h2>Katalóg</h2>
          </div>
          <div className="selection">
            <ul className="selectList">
              <li className="selectItem">
                <a href="#" className="selectButton">DOM</a>
              </li>
              <li className="selectItem">
                <a href="#" className="selectButton">ZÁHRADA</a>
              </li>
              <li className="selectItem">
                <a href="#" className="selectButton">DIEĽŇA</a>
              </li>

            </ul>
          </div>
          <div className="cardsContainer">
            {products.length > 0 ? (
              products.map(product => (
                <Card key={product._id} product={product} />
              ))
            ) : (
              <p>Načítavanie produktov...</p>
            )}
          </div>
        </div>
    </div>
  )
}

export default Catalog