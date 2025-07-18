import React, { useEffect, useState } from 'react'

import '../Dashboard/Dashboard.css'

import DashboardValueCard from './dashboardCards/dashboardValueCard'
import DashboardChartCard from './dashboardCards/dashboardChartCard'

import "./Dashboard"



const Dashboard = () => {

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

  //activeOnSaleProduct

  return (
    <div className="dashboardBox">
      <h3>Dashboard</h3>
      <div className="dashboardTOP">
        <DashboardValueCard
          title="Aktívne produkty"
          value={stats?.activeProduct ?? 'NaN'}
          description="Všetky existujúce produkty"
        />
        <DashboardValueCard
          title="Aktívne produkty v zľave"
          value={stats?.activeOnSaleProduct ?? 'NaN'}
          description="Všetky produkty v zľave"
        />
        <DashboardValueCard 
          title="Aktívne rezervácie" 
          value={stats?.activeReservations ?? 'NaN'} 
          description="Aktívne rezervácie" 
        />
        <DashboardValueCard 
          title="Ďalšia karta 2" 
          value="Soon..." 
          description="Popis metriky 2" 
        />
      </div>
    </div>
  )
}

export default Dashboard