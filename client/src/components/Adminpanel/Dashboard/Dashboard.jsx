import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';

import '../Dashboard/Dashboard.css'

import DashboardValueCard from './dashboardCards/dashboardValueCard'
import DashboardChartCard from './dashboardCards/dashboardChartCard'

import "./Dashboard"



const Dashboard = () => {

  const {stats} = useOutletContext();

  //activeOnSaleProduct

  return (
    <div className="dashboardBox">
      <div className="sectionHeader">
        <h3>Dashboard</h3>
      </div>
      <div className="dashboardTOP">
        <DashboardValueCard
          title="Aktívne produkty"
          value={stats?.activeProduct ?? '0'}
          description="Všetky existujúce produkty"
        />
        <DashboardValueCard
          title="Aktívne produkty v zľave"
          value={stats?.activeOnSaleProduct ?? '0'}
          description="Všetky produkty v zľave"
        />
        <DashboardValueCard 
          title="Aktívne rezervácie" 
          value={stats?.activeReservations ?? '0'} 
          description="Aktívne rezervácie" 
        />
        <DashboardValueCard 
          title="Nové rezervácie" 
          value={stats?.newReservations ?? '0'} 
          description="Nové rezervácie" 
        />
      </div>
    </div>
  )
}

export default Dashboard