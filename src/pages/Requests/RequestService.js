// The RequestService class is a static interface used
// to carry out tasks in request submission and handling pages

import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore" 
import { db, auth } from "../../config/firebase";

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

        // Calls the firestore with query
        getDocs(requestQuery).then(docs => {
            let requests = [];
            docs.forEach(doc => {

                const data = doc.data();

                // IMPROVEMENT: change query such that it is returned in the requestQuery
                const userRef = collection(db, "users");
                const userQuery = query(userRef, where('userID', '==', data.userID));

                // We want to give the name of the users that submitted the requests
                getDocs(userQuery).then( userdocs => {
                    requests.push({...data, id: doc.id, username: userdocs.empty ? "???" : userdocs.docs[0].data().userName});
                    setRequests(requests);
                })
            })
        })
    }

    static fetchUserSpecificRequests = (setRequests, userID) => {
        const requestRef = collection(db, "requests");
        const requestQuery = query(requestRef, where("userID","==",userID));

        // Calls the firestore with query
        getDocs(requestQuery).then(docs => {
            let requests = [];
            docs.forEach(doc => {

                const data = doc.data();

                // IMPROVEMENT: change query such that it is returned in the requestQuery
                const userRef = collection(db, "users");
                const userQuery = query(userRef, where('userID', '==', userID));

                // We want to give the name of the users that submitted the requests
                getDocs(userQuery).then( userdocs => {
                    requests.push({...data, id: doc.id, username: userdocs.empty ? "???" : userdocs.docs[0].data().userName});
                    setRequests(requests);
                })
            })
        })
    }

    static updateRequestStatus = (setRequests, requests, handling, id) => {
        // Change requests for the view
        requests = requests.map(request => request.id === id ? { ...request, handlingStatus: handling } : request)

        // Send and update view if sucessful
        const requestRef = doc(db, "requests", id);
        updateDoc(requestRef, {handlingStatus: handling}).then(() => setRequests(requests));   
    }

    static getTemplateRequest = () => (
        {
            userID: auth.currentUser.uid,   // User that submitted
            handlingStatus: "Submitted",    // Submitted Processing Closed
            title: "",                      // Title
            action: "Custom ticket",        // Type of request
            notes: ""                       // Free comments from the user
        }
    )


}



export default RequestService;