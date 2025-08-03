import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import "../Adminpanel/apanel.css"


import { TiPlus } from "react-icons/ti";
import { MdRemoveShoppingCart } from "react-icons/md";
import Popup from "../Adminpanel/Products/form/popUpForms"


import Logo from "../Adminpanel/logo.png"
import Products from "./Products/products"
import Dashboard from "./Dashboard/Dashboard";
import Reservations from './Reservations/Reservations';
import Settings from './Settings/Settings';
import Visuals from './Visuals/Visuals';

import SidebarComponent from './Sidebar/Sidebar';



function Adminpanel ({products}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [stats, setStats] = useState(null);
  
    useEffect(() => {
      const fetchStats = async () => {
        try{
          const res = await fetch("http://localhost:3005/adminpanel/visuals/stats");
          const data = await res.json();
  
          setStats(data);
        }catch(e){
          console.error("Failed to fetch stats! error: ", e);
        }
      };
  
      fetchStats();
    }, []);
  const navigate = useNavigate();

  const renderComponent = () => {
    switch(activeComponent){
      case "Dashboard":
        return <Dashboard />
        case "Reservations":
        return <Reservations />
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
          navigate={navigate}
          stats={stats}/>
        <div className="AP_Content">
          <Outlet context={{ stats }}/>
        </div>
    </main>
  )
}

export default Adminpanel