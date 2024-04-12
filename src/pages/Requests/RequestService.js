class RequestService 
{
    static generateRequestGUID = () =>
    {
        return Date.now().toString();
    }
}


export default RequestService;