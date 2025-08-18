import React from 'react'
import '../Contact/contact.css'

import config from '../../utils/config';

import { TranslateDay, DAYS_NAME } from '../../utils/dates/dateTranslate';

import { FaPhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail, MdPhoneIphone } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from 'react';
import { useState } from 'react';


const Contact = ({ id }) => {

    const [businessDays, setBusinessDays] = useState([]);

    useEffect(() => {
        const getBusinessDays = async () =>{
            try{
                const res = await fetch(`${config.API_URL}/client/businessDays/getBusinessDays`);

                if(!res){
                    throw new Error("ERROR: ", res.status);
                }

                const data = await res.json();

                if(!data){
                    console.error("Failed to get business days data!");
                    return;
                }

                setBusinessDays(data[0]?.days);

            }catch(e){
                console.error("Failed to get Business Days data!");
            }
        }
        getBusinessDays();
    }, []); //sdsdd

    //console.log("BUSINESS DATA: ", businessDays);

    return (
        <div className="container" id={id}>
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
                                <span className='bold_text'>ZAK SERVICES s.r.o</span>
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
                                <span className='bold_text'>Otvaracie hodiny</span>
                            </li>
                            {DAYS_NAME.map((day, index) => (
                                <li className="openItem" key={day}>
                                    <p className='dayName'>{day}: </p>
                                    <p className='dayTime'>{
                                        businessDays[index]?.isOpen 
                                            ? `${businessDays[index]?.openTime} - ${businessDays[index]?.closeTime}`
                                            : 'Zatvorené'
                                    }</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact