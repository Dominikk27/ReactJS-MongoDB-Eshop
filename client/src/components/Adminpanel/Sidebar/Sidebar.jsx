import React, { useState } from 'react'


import './Sidebar.css'
import Logo from "../logo.png"

import { FaUserTie,FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
import { PiSealPercentFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { BsTicketPerforatedFill } from "react-icons/bs";


const SidebarComponent = ({isOpen, toggle, navigate}) => {

  return (
    <div className={`sideBar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen && (
        <>
        <div className="logo_box">
          <a href="http://localhost:3000/" target='_blank'><img src={Logo} /></a>
        </div>
        <div className="buttons_box">
          <ul className='siedBar_buttonList'>
            <li className='sideBar_buttonBox'><a className='sideBar_button' onClick={() => navigate("dashboard")}> <MdDashboard className='icon'/> Dashboard</a></li>
            <li className='sideBar_buttonBox'><a className='sideBar_button' onClick={() => navigate("reservations")}> <BsTicketPerforatedFill className='icon'/> Reservation</a></li>
            <li className='sideBar_buttonBox'><a className='sideBar_button' onClick={() => navigate("products")}> <MdOutlinePointOfSale className='icon'/> Products</a></li>
            <li className='sideBar_buttonBox'><a className='sideBar_button' onClick={() => navigate("settings")}> <IoMdSettings className='icon'/> Settings</a></li>
            <li className='sideBar_buttonBox'><a className='sideBar_button' onClick={() => navigate("visuals")}> <LuSettings2 className='icon'/> Visuals</a></li>
          </ul>
        </div>
        </>
      )}
      <div className="AP_bottomBar">
        <button className="sideBar_toggleButton" onClick={toggle}>
          <FaBars className='icon'/>
        </button>
      </div>
    </div>
    
  )
}

export default SidebarComponent