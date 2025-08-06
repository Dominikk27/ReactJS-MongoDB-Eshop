import React from 'react'

import { formDate } from '../../../../utils/dates/dateFormat.js';

import { FaCheck } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa6";


import "./reservationCard.css"

const ReservationCard = ({ reservationData, onStatusUpdate }) => {
    
    const handleChangeStatus = async(newStatus) => {
        try{
            const res = await fetch(`http://localhost:3005/client/reservations/updateReservation/${reservationData._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });

            if(!res.ok){
                console.error("Failed to update reservation status!");
                return;
            }
            const updated = await res.json();
            onStatusUpdate(updated);
        }catch(e){
            console.error("Failed to update status! error: ", e);
        }

    }


    //console.log("ReservationData: ", reservationData)
    return (
        <div className={`reserveCardBox status-${reservationData.status}`}>
            <div className="idBox valueBox">
                <p>ID</p>
            </div>
            <div className="pCodeBox valueBox">
                <p>{reservationData.ProductCode}</p>
            </div>
            <div className="lastNameBox valueBox">
                <p>{reservationData.LastName}</p>
            </div>
            <div className="firstNameBox valueBox">
                <p>{reservationData.FirstName}</p>
            </div>
            <div className="dateBox valueBox">
                <p>{formDate(reservationData.ReservationDate)}</p>
            </div>
            <div className="timeBox valueBox">
                <p>{reservationData.ReservationTime}</p>
            </div>
            <div className="statusBox valueBox">
                <p>{reservationData.status}</p>
            </div>
            <div className="actionButtonsBox valueBox">
                {reservationData.status !== "canceled" && reservationData.status !== "complete" ?
                    <>
                        {reservationData.status === 'new' ? 
                        <>
                            <div className="actionBtn btnAcceptReservation" onClick={() => handleChangeStatus("active")}>
                                <FaCheck className='icon'/>
                            </div>
                            <div className="actionBtn btnCancelReservation" onClick={() => handleChangeStatus("cancelled")}>
                                <MdOutlineClose className='icon'/>
                            </div>
                        </>
                        :
                        <>
                            <div className="actionBtn btnAcceptReservation" onClick={() => handleChangeStatus("complete")}>
                                <FaFlagCheckered className='icon'/>
                            </div>
                            <div className="actionBtn btnCancelReservation" onClick={() => handleChangeStatus("cancelled")}>
                                <MdOutlineClose className='icon'/>
                            </div>
                        </>
                        }
                    </> :null
                }
            </div>
        </div>
    )
}

export default ReservationCard