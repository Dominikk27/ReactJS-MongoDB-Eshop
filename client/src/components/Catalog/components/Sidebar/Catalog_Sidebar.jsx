import React, { useState } from 'react'
import "./Catalog_Sidebar.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { useEffect } from 'react';

const Catalog_Sidebar = ({ filters, isOpen }) => {
  const [openSection, setOpenSection] = useState({});


  const toggleSection = (sectionName) =>{
    setOpenSection(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }

  const sectionLabels = {
    productTypes: "Typ produktu",
    productDrives: "Typ pohonu",
    productBrands: "Značka",
  }


  //elektrika, aku, benzin
  const filterOptionLabels = {
    ak: "akumulátorové",
    benzin: "benzínové",
    elektro: "elektrické",

    parkova_kosacka: "parkové kosačky",
    traktorova_kosacka: "traktorové kosačky",
    krovinorez: "krovinorezy",
    pila: "píly",
  }


  return (
    <div className={`catalog-sideBar ${!isOpen ? "closed" : "opened"}`}>
      <div className="sideBar-SearchBar">
        <div className="searchIconBar">
          <IoMdSearch className='icon'/>
        </div>
        <input type="text" name="" id="searchBar" />
      </div>
      <div className="sideBarContent">
        {filters && Object.entries(filters).map(([sectionName, filters]) =>(
          <div className="filterSection" key={sectionName}>
              <div 
                className="filterHeader"
                onClick={() => toggleSection(sectionLabels[sectionName])}
              >
                <span className='sectionLabel'>{sectionLabels[sectionName]}</span>
                {openSection[sectionLabels[sectionName]] ? <IoIosArrowUp className='icon'/> : <IoIosArrowDown className='icon'/>}
              </div>

            {openSection[sectionLabels[sectionName]] && (
              <div className="filterContent">
                {filters.map((filter, key) => (
                  <label><input type="checkbox" key={filter}/> {filter}</label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog_Sidebar