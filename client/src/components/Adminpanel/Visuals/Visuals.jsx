import React from 'react'

import PartnersSettings from './components/partners/partners';
import BusinessDays from './components/businessDays/businessDays';
import Socials from './components/socials/socials';

import "./Visuals.css"

const Visuals = () => {
  return (
    <div className="visualsBox">
      <div className="sectionHeader">
        <h3>Visuals Settings</h3>
      </div>
      <div className="visualsContent">
        <PartnersSettings />
        <div className="rowContainer">
          <BusinessDays />
          <Socials />
        </div>
      </div>
    </div>
  )
}

export default Visuals