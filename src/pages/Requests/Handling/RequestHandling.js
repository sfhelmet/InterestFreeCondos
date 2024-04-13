import React, { useState, useEffect } from 'react';
import RequestService from '../RequestService' 
import { auth } from "../../../config/firebase";
import '../RequestStyling.css'


const RequestHandling = () => {


    const [requests, setRequests] = useState(null);



    useEffect( () => {
        RequestService.fetchRequests(setRequests);
    }, []);


    const printRequests = () => {
        console.log(requests);
    } 



    return (
        <div className='page-container' style={{ backgroundColor: "#193446", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

        <div className="container-fluid" style={{marginTop: "0"}}>

        <h1 className='page-title'>Request handling</h1>
        <button type="button" className="btn btn-primary" onClick={printRequests}>Print requests (dev)</button>

        {requests ? (requests.map( request => (

        <div className="row" key={request.id}>
            <div className="col">
            <div className="card m-2">
            <h5 className="card-header">{request.title}</h5>
            <div className="card-body">
       
          
            </div>
            </div>
            </div>
            </div>))) : (<></>)}
        </div>

    </div>
    )
}


export default RequestHandling;