import React from 'react'
import '../Contact/contact.css'

import { FaPhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail, MdPhoneIphone } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";





import image from '../Contact/contactIMAGE.png'

const Contact = () => {
  return (
    <div className="container">
        <div className="header">
            <h2>Kontakt</h2>
        </div>
        <div className="contactCard">
            <div className="contactMAP">
                <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5261.19583864965!2d17.562447!3d48.751377!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDQ1JzA2LjYiTiAxN8KwMzMnNDMuMyJF!5e0!3m2!1ssk!2sus!4v1720221574621!5m2!1ssk!2sus"></iframe>
            </div>
            
            <div className="cardContent">
                <div className="contactBox">
                    <ul className="contactList">
                        <li className="contactItem">
                            <div className="icon"></div><span className='bold'>ZAK SERVICES s.r.o</span>
                        </li>
                        <li className="contactItem">
                            <FaMapMarkerAlt className='icon'/> Moravská 619/1A, 907 01 Myjava
                        </li>
                        <li className="contactItem">
                            <FaPhone className='icon'/> +421 918 523 756
                        </li>
                        <li className="contactItem">
                            <MdPhoneIphone className='icon'/> 034 / 621 44 00
                        </li>
                        <li className="contactItem">
                            <MdOutlineAlternateEmail className='icon'/> richard.majtan@zakservices.sk
                        </li>
                        <li className="contactItem">
                            <MdOutlineAlternateEmail className='icon'/> myjava@zakservices.sk
                        </li>
                    </ul>
                </div>
                <div className="openHours">
                    <ul className="openList">
                        <li className="openItem">
                            Pondelok 
                        </li>
                        <li className="openItem">
                            Útorok
                        </li>
                        <li className="openItem">
                            Streda
                        </li>
                        <li className="openItem">
                            Štvrtok
                        </li>
                        <li className="openItem">
                            Piatok
                        </li>
                        <li className="openItem">
                            Sobota
                        </li>
                        <li className="openItem">
                            Nedeľa
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact