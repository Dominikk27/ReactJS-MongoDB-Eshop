import React from 'react'
import '../card/card.css'

import { FaStar, FaRegStar } from "react-icons/fa";

import testImage from '../card/image/pila.jpg'

const Card = () => {
  return (
    <div className="cardBox">
      <div className="cardImage">
        <img src={testImage} alt="" />
      </div>
      <div className="cardContent">
        <div className="cardTitle">
          <h4>STIHL 25256</h4>
        </div>
        <div className="starsBox">
          <FaStar className='icon'/>
          <FaStar className='icon'/>
          <FaStar className='icon'/>
          <FaRegStar className='icon'/>
          <FaRegStar className='icon'/>
        </div>
        <div className="cardDescription">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sequi deserunt expedita voluptatem numquam doloribus? Enim aliquid ipsa dolorum obcaecati nulla. Vero consequatur ipsa recusandae, ad vitae quia nulla reiciendis?
        </div>
        <div className="readMore">
          Zobraziť produkt
        </div>
      </div>
    </div>
  )
}

export default Card