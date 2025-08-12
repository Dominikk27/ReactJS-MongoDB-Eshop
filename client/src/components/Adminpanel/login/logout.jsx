import React, { useState } from 'react'
import { FaUser } from "react-icons/fa6";


import "./login.css"

const Logout = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () =>{
    setIsOpened(!isOpened);
  }


  return (
    <div className="logoutBox">
        <div className="logoutButtonBox" onClick={handleOpen}>
            <div className="logoutUserIcon">
                <FaUser className='icon'/>
            </div>
        </div>
        {isOpened ?
          <div className="buttonOptions">
            <button className="logoutBTN">Odhlásiť sa!</button>
          </div>: null
          }
    </div>
  )
}

export default Logout