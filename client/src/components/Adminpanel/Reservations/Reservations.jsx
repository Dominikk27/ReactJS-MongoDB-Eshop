import React, { useEffect, useState } from 'react'
import './Reservations.css';

import ReservationCard from './card/reservationCard';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("http://localhost:3005/client/reservations/getReservations")
        const data = await res.json();
        setReservations(data)
      } catch (e) {
        console.error("Failed to fetch reservations!", e)
      }
    }

    fetchReservations()
  }, []);

  const handleStatusUpdate = (updatedReservation) =>{
    setReservations(prev => 
      prev.map(res =>
        res._id === updatedReservation._id ? updatedReservation : res
      )
    )
  }

  return (
    <div className="reservationsBox">
      <div className="sectionHeader">
        <h3>Reservations</h3>
      </div>
      <div className="reservationsContainer">
        <div className="reservationsHeader">
          <div className="idBox headerBox">
              <p>ID</p>
          </div>
          <div className="pCodeBox headerBox">
              <p>PRODUCT CODE</p>
          </div>
          <div className="lastNameBox headerBox">
              <p>PRIEZVISKO</p>
          </div>
          <div className="firstNameBox headerBox">
              <p>MENO</p>
          </div>
          <div className="dateBox headerBox">
              <p>DATUM</p>
          </div>
          <div className="timeBox headerBox">
              <p>ČAS</p>
          </div>
          <div className="statusBox headerBox">
              <p>STATUS</p>
          </div>
          <div className="actionButtonsBoxHeader headerBox">
              <p>ACTIONS</p>
          </div>
        </div>
        {reservations.map((reservation, index) => (
          <ReservationCard key={index} 
            reservationData={reservation} 
            onStatusUpdate={handleStatusUpdate} />
        ))}
      </div>
    </div>
  )
}

export default Reservations