import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { FaUser } from "react-icons/fa6";

import { useAuth } from "./AuthContext.js";


import "./login.css"

const Logout = () => {

  const navigate = useNavigate();


  const { logout } = useAuth();
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () =>{
    setIsOpened(!isOpened);
  }

  const handleLogout = () =>{
    logout();
    navigate("/login");
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
            <button className="logoutBTN" onClick={handleLogout}>Odhlásiť sa!</button>
          </div>: null
          }
    </div>
  )
}

export default Logout