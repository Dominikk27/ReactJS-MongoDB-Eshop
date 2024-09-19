import React from 'react'
import "../Navbar/Navbar.css"
import { SlSocialInstagram, SlSocialFacebook, SlSocialGoogle   } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaMapMarkerAlt, FaChevronDown} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";



import Logo from './logo.png'

const Navbar = () => {
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
                <a href="#" className="navButton">
                  Domov
                </a>
              </li>
              <li className="navItem">
                <a href="#" className="navButton">
                  Katalóg
                </a>
              </li>
              <li className="navItem">
                <a href="#" className="navButton">
                  Služby
                </a>
              </li>
              <li className="navItem">
                <a href="#" className="navButton">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
          <div className="contactBox">
            <div className="phoneIconBox">
              <FiPhoneCall className='phoneIcon'/>
            </div>
            <div className="phoneNumber">
              <h3>+421 902 840 733</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar