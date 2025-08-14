import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import "../Adminpanel/apanel.css"

import { useAuth } from './login/AuthContext';

import Logout from "./login/logout";

import SidebarComponent from './Sidebar/Sidebar';



function Adminpanel ({products}) {
  const { token } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [stats, setStats] = useState(null);
  
    useEffect(() => {
      
      const fetchStats = async () => {
        try{
          const res = await fetch("http://localhost:3005/adminpanel/visuals/stats", {
            method: "GET",
            credentials: "include"
          });
          const data = await res.json();
  
          setStats(data);
        }catch(e){
          console.error("Failed to fetch stats! error: ", e);
        }
      };
  
      fetchStats();
    }, []);
  const navigate = useNavigate();

  return( 
    <main className='AP_Container'>
        <SidebarComponent 
          isOpen={isSidebarOpen} 
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          navigate={navigate}
          stats={stats}/>
        <div className="AP_Content">
          <Logout />
          <Outlet context={{ stats }}/>
        </div>
    </main>
  )
}

export default Adminpanel