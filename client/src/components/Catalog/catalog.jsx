import React, { useEffect, useState } from 'react'
import '../Catalog/catalog.css'
import Card from '../Catalog/card/card'

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3005/adminpanel/products');
      const data = await res.json();

      const updatedProducts = data.products.map(product => ({
        ...product,
        price: product.price?.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price,
      }));

      setProducts(updatedProducts);
    };

    fetchData();
  }, []);

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