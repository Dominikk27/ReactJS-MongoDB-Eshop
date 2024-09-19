import React from 'react'
import '../Catalog/catalog.css'
import Card from '../Catalog/card/card'

const Catalog = () => {
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
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
    </div>
  )
}

export default Catalog