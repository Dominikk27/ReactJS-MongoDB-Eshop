import React, { useEffect } from 'react'
import "../Navbar/Navbar.css"

import { NavLink, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import { SlSocialInstagram, SlSocialFacebook, SlSocialGoogle, SlSocialTwitter, SlSocialYoutube   } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaMapMarkerAlt, FaChevronDown} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

import { FaHome, FaTools  } from "react-icons/fa";
import { RiFileList3Line, RiContactsBook3Fill  } from "react-icons/ri";

import Logo from './logo.png'
import { useState } from 'react';

const Navbar = () => {

  const [socialLinks, setSocialLinks] = useState({});
  const socialIcons = {
    Facebook: <SlSocialFacebook />,
    Instagram: <SlSocialInstagram />,
    Google: <SlSocialGoogle />,
    Youtube: <SlSocialYoutube />,
    Twitter: <SlSocialTwitter />
  }
  const socialKeys = Object.keys(socialIcons);

  useEffect(() =>{
    const fetchSocials = async () => {
      try{
        const socialsRes = await fetch("http://localhost:3005/client/socials/getSocials");
        const socialsData = await socialsRes.json();
        setSocialLinks(socialsData[0] || {});


      }catch(e){
        console.error("Failed to fetch social links! error: ", e);
      }
    }
    fetchSocials();
  }, []);

  console.log("SOCIALS: ",socialLinks);

  const location = useLocation();

  const scrollToSection =  (section) => {
    scroller.scrollTo(section, {
      duration: 600,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
  };

  const handleSectionSelect = (section, e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection(section);
    }
  }

  const isSectionActive = (section) => {
    return location.pathname === '/' &&
           location.hash === `#${section}`;
  };

  return (
    <div className='header'>
      <div className="upperBar">
        <div className="innerBox">
          <div className="topList">
            <ul>
              <li><FaRegClock className='icon' /> Pondelok-Piatok: xx:xx - xx:xx</li>
              <li><FaMapMarkerAlt className='icon' /> Myjava 907 01</li>
            </ul>
          </div>
          <div className="socials">
            <ul className='socialsList'>
              {Object.entries(socialLinks)
                .filter(([key, value]) => socialKeys.includes(key))
                .filter(([key, value]) => value && value.trim !== "")
                .map(([key, value]) =>(
                  <li key={key}>
                    <a href={value} target="_blank">
                      {socialIcons[key]}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bottomBar">
        <div className="logoBox">
          <img src={Logo} alt="logo"/>
        </div>
        <div className="rightSideBox">
          <div className="navigation">
            <ul className="navBar">
              <li className="navItem">
                <NavLink
                  to="/" end className={({ isActive }) =>
                    isActive ? "navButton active" : "navButton"}>
                    <FaHome className="navIcon"/> Domov
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  to="/catalog" end className={({ isActive }) =>
                    isActive ? "navButton active" : "navButton"}>
                  <RiFileList3Line className="navIcon"/> Katalóg
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  to="/#services" end className={({ isActive }) =>
                    isActive ? "navButton active" : "navButton"}
                    onClick={(e) => handleSectionSelect('services', e)}>
                  <FaTools className="navIcon"/>Služby
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  to="/#contact" end className={({ isActive }) =>
                    isActive ? "navButton active" : "navButton"}
                    onClick={(e) => handleSectionSelect('contact', e)}>
                  <RiContactsBook3Fill  className="navIcon"/>Kontakt
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="numberContactBox">
            <div className="phoneIconBox">
              <FiPhoneCall className='phoneIcon'/>
            </div>
            <div className="phoneNumber">
              <h3>+421 123 456 789</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
