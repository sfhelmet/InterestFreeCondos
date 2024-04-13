// The RequestService class is a static interface used
// to carry out tasks in request submission and handling pages

class RequestService 
{
    // The request data structure
    // {
    //     userID: "...",           // User that submitted
    //     handlingStatus: "...",   // Submitted Processing Closed
    //     title: "...",            // Title
    //     action: "...",           // 
    //     notes: "..."             // Free comments from the user
    // };

    // Random guid to avoid id collision
    static generateRequestGUID = () => Date.now().toString();


}



export default RequestService;