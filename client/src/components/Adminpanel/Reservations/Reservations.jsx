import React, { useEffect, useState } from 'react'
import './Reservations.css';

import ReservationCard from './card/reservationCard';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

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
        <div className="filtersBox">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">Všetky</option>
            <option value="complete">Complete</option>
            <option value="active">Active</option>
            <option value="canceled">Cancelled</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">Všetky</option>
            <option value="1">Január</option>
            <option value="2">Február</option>
            <option value="3">Marec</option>
            <option value="4">Apríl</option>
            <option value="5">Máj</option>
            <option value="6">Jún</option>
            <option value="7">Júl</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">Október</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
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
        <div className="reservationCardsContainer">
          {reservations
            .filter(reservation => 
              filterStatus === '' ? true : reservation.status === filterStatus
            )
            .map((reservation, index) => (
              <ReservationCard key={index}
                reservationData={reservation}
                onStatusUpdate={handleStatusUpdate} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Reservations