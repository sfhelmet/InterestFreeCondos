import React, { useState} from 'react';
import RequestService from '../RequestService' 
import '../RequestStyling.css'


const RequestSubmission = () =>
{
    // Default request
    const [formData, setFormData] = useState(RequestService.getTemplateRequest());


    // Modify currently stored form info
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    const handleSubmit = (e) => {

        // Not allowing empty titles
        if (formData.title === "") {
            // Prevent the page from reloading upon submitting the form
            e.preventDefault();
            alert("Your request is missing a title.")
            return
        }

        // Go through with request
        RequestService.uploadRequest(formData);

        alert("Your request has been submitted!")
    }

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
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Request title" onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="action">What would you like to request?</label>
                        <select className="form-control" id="action" onChange={handleChange}>
                            <option>Custom ticket</option>
                            <option>Moving</option>
                            <option>Intercom changes</option>
                            <option>Access (fobs, key)</option>
                            <option>Report a violation</option>
                            <option>Reporting a deficiency</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Description (optional)</label>
                        <textarea className="form-control" id="notes" rows="3" placeholder='Add your comments' onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary nexus-submit" onClick={handleSubmit}>Submit</button>
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