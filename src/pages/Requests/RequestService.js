// The RequestService class is a static interface used
// to carry out tasks in request submission and handling pages

import { collection, addDoc, getDoc, getDocs, query, where } from "firebase/firestore" 
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
        const requestRef = collection(db, "requests");
        addDoc(requestRef, formData).then(() => console.log("Request sent"));
    }

    // Gets all current requests
    static fetchRequests = (setRequests) => {
        const requestRef = collection(db, "requests");
        const requestQuery = query(requestRef);
        console.log("Fetching ");

        // Calls the firestore with query
        getDocs(requestQuery).then(docs => {
            let requests = [];
            docs.forEach(doc => {

                const data = doc.data();
                // We want to give the name of the users that submitted the requests
                const userRef = collection(db, "users");
                const userQuery = query(userRef, where('userID', '==', data.userID));
                getDocs(userQuery).then( userdocs => setRequests([... requests , {... data, id: doc.id, username: userdocs.empty ? "???" : userdocs.docs[0].data().userName}]));

            })
        })
    }


}



export default RequestService;