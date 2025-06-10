import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import "../Adminpanel/apanel.css"


import { TiPlus } from "react-icons/ti";
import { MdRemoveShoppingCart } from "react-icons/md";
import Popup from "../Adminpanel/Products/form/popUpForms"


import Logo from "../Adminpanel/logo.png"
import Products from "./Products/products"
import Dashboard from "./Dashboard/Dashboard";
import Settings from './Settings/Settings';
import Visuals from './Visuals/Visuals';

import OnSale from './Products/onSale';
import SidebarComponent from './Sidebar/Sidebar';



function Adminpanel ({products}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const navigate = useNavigate();

  const renderComponent = () => {
    switch(activeComponent){
      case "Dashboard":
        return <Dashboard />
      case "Products":
        return <Products />
      case "Settings":
        return <Settings />
      case "Visuals":
        return <Visuals />
    }
  }

  return( 
    <main className='AP_Container'>
        <SidebarComponent 
          isOpen={isSidebarOpen} 
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          navigate={navigate}/>
        <div className="AP_Content">
          <Outlet />
        </div>
    </main>
  )
}

export default Adminpanel