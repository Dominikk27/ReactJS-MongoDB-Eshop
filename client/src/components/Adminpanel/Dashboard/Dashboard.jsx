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
          value={stats?.activeProduct ?? 'NaN'}
          description="Všetky produkty v zľave"
        />
        <DashboardValueCard 
          title="Ďalšia karta" 
          value="NaN" 
          description="Popis ďalšej metriky" 
        />
        <DashboardValueCard 
          title="Ďalšia karta 2" 
          value="NaN" 
          description="Popis metriky 2" 
        />
      </div>
    </div>
  )
}

export default Dashboard