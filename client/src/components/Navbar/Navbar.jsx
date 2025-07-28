import React, { useEffect } from 'react'
import "../Navbar/Navbar.css"

import { NavLink, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import { SlSocialInstagram, SlSocialFacebook, SlSocialGoogle   } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaMapMarkerAlt, FaChevronDown} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

import { FaHome, FaTools  } from "react-icons/fa";
import { RiFileList3Line, RiContactsBook3Fill  } from "react-icons/ri";

import Logo from './logo.png'

const Navbar = () => {
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
              <li>
                <a href="#">
                  <SlSocialInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <SlSocialFacebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <SlSocialGoogle />
                </a>
              </li>
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