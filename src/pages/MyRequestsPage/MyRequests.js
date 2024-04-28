import React, { useState, useEffect } from 'react';
import RequestService from '../Requests/RequestService';
import { useAuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext';

import './MyRequests.css'

const MyRequests = () => {

    const { authenticatedUser: currentUser } = useAuthenticatedUserContext();
    const [requests, setRequests] = useState([]);

    // Queries firestore for requests
    useEffect( () => {
        RequestService.fetchUserSpecificRequests(setRequests, currentUser.userID)
    }, [currentUser]);//Change to custom version
    
    // Used to sort the requests
    const closedSorting = (a, b) => {

        // Submitted are on top, then Processing, and Closed at the bottom
        // This is the order, add new status according to this rule
        const statusOrder = {
            "Submitted": 1,
            "Processing": 2,
            "Closed": 3
        };
    
        return statusOrder[a.handlingStatus] - statusOrder[b.handlingStatus];    
    }

    // Sort cards by handling status
    const filterClosed = () => setRequests(requests.slice().sort(closedSorting));

    return (
        <div style={{backgroundColor: "#193446"}}>
            <div className='my-requests-page-container' style={{ backgroundColor: "#193446", height: "100vh", display: "flex", alignItems: "stretch", justifyContent: "center" }}>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

                <div className="container-fluid" style={{marginTop: "0"}}>
                    <div className="d-flex justify-content-between">
                        <h1 className='page-title'>My Requests</h1>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <button type="button" className="btn btn-primary nexus-submit" onClick={filterClosed}>Sort requests</button>
                        </div>
                    </div>

                    {
                        requests.length !== 0 ? (requests.map( request => (
                            <div className="row" key={request.id}>
                                <div className="col">
                                    <div className="card" style={{marginBottom: "10px", marginTop: "10px"}}>
                                        <div className="card-header">
                                            <div className="d-flex justify-content-between">
                                                <h5>{request.title}</h5>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className='card-title'>Action: {request.action}</h5>

                                                <div style={{ display: "flex", justifyContent: "right" }}>
                                                    <h4>
                                                        <span>
                                                            <div className="badge badge-dark">{request.handlingStatus}</div>
                                                        </span>
                                                    </h4>
                                                </div>
                                            </div>
                                            <li className="list-group-item w-100">Requested by: {request.username}</li>
                                            {request.notes ? (<li className="list-group-item"><p>Comments: {request.notes}</p></li>) : <></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) 
                        : 
                        <div className='no-requests-container'>
                            <h3>You have no pending requests!</h3>
                            <h5>Need to create one? Click on Requests in the navigation bar to get started!</h5>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default MyRequests;