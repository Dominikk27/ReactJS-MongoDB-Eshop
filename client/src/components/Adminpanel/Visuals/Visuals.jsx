import React from 'react'

import PartnersSettings from './components/partners/partners';
import WorkingDays from './components/workingDays/workingDays';
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
          <Socials />
        </div>
        <WorkingDays />
      </div>
    </div>
  )
}

export default Visuals