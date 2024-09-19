import React from 'react';
import './services.css';
import { FaCashRegister, FaTools } from "react-icons/fa";
import { LiaAdSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";



import Billboard from './board.png';
import frame from './wheat.png'

const Services = () => {
  return (
    <div className="servicesContainer">
      <div className="background">
        <div className="header">
          <h2>Služby</h2>
        </div>
        <div className="serviceCardsContainer">
          <div className="serviceCard">
            <div className="serviceIMG">
              <FaCashRegister className='serviceIcon' />
            </div>
            <div className="serviceContent">
              <div className="serviceTitle">
                <h3>Predaj</h3>
              </div>
              <div className="serviceDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nulla ipsam cumque voluptatum, eius non corporis dolorem, magnam necessitatibus temporibus atque unde recusandae optio quasi nemo vel architecto voluptate illo!
              </div>
            </div>
          </div>

          <div className="serviceCard">
            <div className="serviceIMG">
              <FaTools className='serviceIcon' />
            </div>
            <div className="serviceContent">
              <div className="serviceTitle">
                <h3>Servis</h3>
              </div>
              <div className="serviceDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nulla ipsam cumque voluptatum, eius non corporis dolorem, magnam necessitatibus temporibus atque unde recusandae optio quasi nemo vel architecto voluptate illo!
              </div>
            </div>
          </div>

          <div className="serviceCard">
            <div className="serviceIMG">
              <MdSupportAgent className='serviceIcon' />
            </div>
            <div className="serviceContent">
              <div className="serviceTitle">
                <h3>Podpora</h3>
              </div>
              <div className="serviceDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nulla ipsam cumque voluptatum, eius non corporis dolorem, magnam necessitatibus temporibus atque unde recusandae optio quasi nemo vel architecto voluptate illo!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services