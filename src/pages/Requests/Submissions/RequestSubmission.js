import React /*, { useState, useEffect, useContext } */ from 'react';
import RequestService from '../RequestService'
import '../RequestStyling.css'


const RequestSubmission = () =>
{
    return (
    <div className='page-container' style={{ backgroundColor: "#193446", height: "100vh" }}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

        <div className="container-fluid">

        <h1 className='page-title'>Request submission</h1>

        <div className="row">
            <div className="col">
            <div className="card m-2">
            <h5 className="card-header">Open a request ticket</h5>
            <div className="card-body">

                <form>

                    <div className="form-group">
                        <label for="requestTitle">Title</label>
                        <input type="text" className="form-control" id="requestTitle" placeholder="Request title" />
                    </div>
                    
                    <div className="form-group">
                        <label for="actionSelect">What would you like to request?</label>
                        <select class="form-control" id="actionSelect">
                            <option>Custom ticket</option>
                            <option>Moving</option>
                            <option>Intercom changes</option>
                            <option>Access (fobs, key)</option>
                            <option>Report a violation</option>
                            <option>Reporting a deficiency</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="notesTextArea">Description (optional)</label>
                        <textarea class="form-control" id="notesTextArea" rows="3" placeholder='Add your comments'></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary nexus-submit">Submit</button>
                </form>
            </div>
            </div>
            </div>
           </div>
        </div>
    </div>
    )
}

export default RequestSubmission;