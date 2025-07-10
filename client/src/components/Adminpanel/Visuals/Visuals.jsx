import React from 'react'

import './Visuals.css'

import { IoClose } from "react-icons/io5";

import stihl from './images/stihl.png'
import cubCadet from './images/cubcadet.png'
import mtd from './images/mtd.png'
import DAKR from './images/DAKR.jpg'
import wolfGarten from './images/wolfgarten.png'
import supa from './images/supa.png'

const Visuals = () => {
  return (
    <div className="visualsBox">
      <h3 className='tabName'>Visual Settings</h3>
      <div className="visualsPartnersBox">
        <h4 className='categoryName'>Partners</h4>
        <div className="visualsPartnersIMGBox">
          <div className="partner">
            <img src={stihl} alt="" />
            <IoClose className='removeIcon'/>
          </div>
          <div className="partner">
            <img src={mtd} alt="" />
            <IoClose className='removeIcon'/>
          </div>
          <div className="partner">
            <img src={supa} alt="" />
            <IoClose className='removeIcon'/>
          </div>
          <div className="partner">
            <img src={wolfGarten} alt="" />
            <IoClose className='removeIcon'/>
          </div>
          <div className="partner">
            <img src={DAKR} alt="" />
            <IoClose className='removeIcon'/>
          </div>
          <div className="partner">
            <img src={cubCadet} alt="" />
            <IoClose className='removeIcon'/>
          </div>
          <div className="partner">
            <div className="addPartner">Add Partner</div>
          </div>
        </div>
        <div className="partnersActionButtonsBox">
          <div className="cancelChangesPartnersBTN BTN">
            Cancel Changes
          </div>
          <div className="submitChangesPartnersBTN BTN">
            Submit Changes
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visuals