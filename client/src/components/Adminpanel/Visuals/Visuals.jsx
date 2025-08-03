import React from 'react'

import PartnersSettings from './components/partners/partners';

import "./Visuals.css"
import Socials from './components/socials/socials';

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
      </div>
    </div>
  )
}

export default Visuals