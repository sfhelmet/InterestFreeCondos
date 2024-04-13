// The RequestService class is a static interface used
// to carry out tasks in request submission and handling pages

import { collection, addDoc } from "firebase/firestore" 
import { db } from "../../config/firebase";

class RequestService 
{
    // The request data structure
    // {
    //     userID: "...",           // User that submitted
    //     handlingStatus: "...",   // Submitted Processing Closed
    //     title: "...",            // Title
    //     action: "...",           // Action
    //     notes: "..."             // Free comments from the user
    // };

    // Send request object to firestore
    static uploadRequest = (formData) => {
        const requestRef = collection(db, "requests")
        addDoc(requestRef, formData).then(() => console.log("Request sent"));
    }

}



export default RequestService;