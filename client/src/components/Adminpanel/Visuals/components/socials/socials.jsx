import React from 'react'

import { FaFacebook, FaInstagram, FaGoogle, FaYoutube } from "react-icons/fa";

import "./socials.css"

const Socials = () => {
  return (
    <div className="socialsBox">
        <h4 className='categoryName'>Socials</h4>
        <div className="socialsInputsContainer">
            <div className="socialInputWrapper">
                <div className="iconBox">
                    <FaFacebook className="socialIcon" />
                </div>
                <input type="text" className="socialInput" placeholder="Facebook link" />
            </div>
            <div className="socialInputWrapper">
                <div className="iconBox">
                    <FaInstagram className="socialIcon" />
                </div>
                <input type="text" className="socialInput" placeholder="Instagram link" />
            </div>
            <div className="socialInputWrapper">
                <div className="iconBox">
                    <FaGoogle  className="socialIcon" />
                </div>
                <input type="text" className="socialInput" placeholder="Google link" />
            </div>
            <div className="socialInputWrapper">
                <div className="iconBox">
                    <FaYoutube  className="socialIcon" />
                </div>
                <input type="text" className="socialInput" placeholder="YouTube link" />
            </div>
        </div> 
    </div>
  )
}

export default Socials