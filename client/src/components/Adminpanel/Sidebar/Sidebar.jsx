import React, { useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';


import './Sidebar.css'
import Logo from "../logo.png"

import { FaUserTie,FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
import { PiSealPercentFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { BsTicketPerforatedFill } from "react-icons/bs";


const SidebarComponent = ({ isOpen, toggle, navigate, stats }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(`/adminpanel/${path}`);

  return (
    <div className={`sideBar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen && (
        <>
        <div className="logo_box">
          <a href="http://localhost:3000/" target='_blank'><img src={Logo} /></a>
        </div>
        <div className="buttons_box">
          <ul className='siedBar_buttonList'>
            <li className={`sideBar_buttonBox ${isActive("dashboard") ? "active" : ""}`}><NavLink to='/adminpanel/dashboard' className='sideBar_button'> <MdDashboard className='icon'/> Dashboard</NavLink></li>
            <li className={`sideBar_buttonBox ${isActive("reservations") ? "active" : ""}`}><NavLink to='/adminpanel/reservations' className='sideBar_button'> <BsTicketPerforatedFill className='icon'/> Reservation</NavLink>
            
            {stats?.newReservations > 0 && ( <div className="notificationBox"></div>)}
            </li>
            <li className={`sideBar_buttonBox ${isActive("products") ? "active" : ""}`}><NavLink to='/adminpanel/products' className='sideBar_button'> <MdOutlinePointOfSale className='icon'/> Products</NavLink></li>
            <li className={`sideBar_buttonBox ${isActive("settings") ? "active" : ""}`}><NavLink to='/adminpanel/settings' className='sideBar_button'> <IoMdSettings className='icon'/> Settings</NavLink></li>
            <li className={`sideBar_buttonBox ${isActive("visuals") ? "active" : ""}`}><NavLink to='/adminpanel/visuals' className='sideBar_button'> <LuSettings2 className='icon'/> Visuals</NavLink></li>
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