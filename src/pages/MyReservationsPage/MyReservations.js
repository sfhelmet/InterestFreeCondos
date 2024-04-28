import React, { useState, useEffect } from 'react';
import RequestService from '../Requests/RequestService';
import { useAuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext';

import './MyReservations.css'

const MyReservations = () => {

    const { authenticatedUser: currentUser } = useAuthenticatedUserContext();
    const [reservations, setReservations] = useState([]);

    // Queries firestore for reservations
    useEffect( () => {
        RequestService.fetchUserSpecificReservations(setReservations, currentUser.userName);
    }, [currentUser]);//Change to custom version

    return (
        <div style={{backgroundColor: "#193446"}}>
            <div className='my-reservations-page-container' style={{ backgroundColor: "#193446", height: "100vh", display: "flex", alignItems: "stretch", justifyContent: "center" }}>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

                <div className="container-fluid" style={{marginTop: "0"}}>
                    <div className="d-flex justify-content-between">
                        <h1 className='page-title'>My Reservations</h1>
                    </div>

                    {
                        reservations.length !== 0 ? (reservations.map( (reservation, index) => (
                            <div className="row" key={index}>
                                <div className="col">
                                    <div className="card" style={{marginBottom: "10px", marginTop: "10px"}}>
                                        <div className="card-header">
                                            <div className="d-flex justify-content-between">
                                                <h5>Reservation for {reservation.amenityName} at {reservation.buildingName}</h5>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className='card-title'>Reservation Date: {reservation.date}</h5>

                                                <div style={{ display: "flex", justifyContent: "right" }}>
                                                    <h4>
                                                        <span>
                                                            <div className="badge badge-dark">{reservation.handlingStatus}</div>
                                                        </span>
                                                    </h4>
                                                </div>
                                            </div>
                                            <li className="list-group-item w-100">Reserved by: {reservation.user}</li>
                                            <li className="list-group-item w-100">From: {reservation.start}</li>
                                            <li className="list-group-item w-100">To: {reservation.end}</li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) 
                        : 
                        <div className='no-reservations-container'>
                            <h3>You have no pending reservations!</h3>
                            <h5>Need to create one? Click on Reservations in the navigation bar to get started!</h5>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default MyReservations;