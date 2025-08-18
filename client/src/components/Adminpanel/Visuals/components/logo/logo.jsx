import React from 'react'
import { FaBold, FaUpload } from "react-icons/fa";

import logo from "../../../../Adminpanel/logo.png";
import "./logo.css";
import { useState } from 'react';

const Logo = () => {
  const [isHover, setIsHover] = useState(false);
  const [isLoadedLogo, setIsLoadedLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleFileChange = (e) =>{
    const logo = e.target.files[0];
    if(!logo){
      return;
    }

    const logoURL = URL.createObjectURL(logo);
    setLogoPreview(logoURL);
    setIsLoadedLogo(true);
  }

  return (
    <div className="logoCardBox">
      <h4 className='categoryName'>Logo</h4>
      <div className={`logoContentBox ${!isLoadedLogo ? 'logoEmpty' : 'logoExist'}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        {isLoadedLogo ?
          (<>
            <img className={`logoIMG ${!isHover || !isLoadedLogo ? '' : 'isHover'}`} src={logoPreview}></img>
            <button className={`actionBTN ${!isHover || !isLoadedLogo ? '' : 'isHover'}`}>TEST</button>
          </>)
          :
          (<div className="emptyBox">
            <div className='inputContainer'>
              <input 
                id="logo-input" 
                type="file" 
                name='logoImage' 
                title='logoImage' 
                accept='image/*' 
                onChange={handleFileChange}
              />
              <label htmlFor="logo-input">
                <FaUpload className='uploadIcon' /> 
                <span>Vyber obrázok</span>
              </label>
            </div>
          </div>)
        }
      </div>
      {isLoadedLogo ?
        <div className="ap_ActionButtonsBox">
          <button className="cancelChangesBTN BTN">
              Cancel Changes
          </button>
          <button className="submitChangesBTN BTN" type="submit">
              Submit Changes
          </button>
        </div> :null}
    </div>
  )
}

export default Logo