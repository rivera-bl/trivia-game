// Simple class for the fetching needs of this project
// It doesn't use any header nor options, tho it could be extended easily
class HttpClient {

    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchJSON(endpoint){
        const res = await fetch(this.baseURL + endpoint);
        if(!res.ok) throw new Error(res.statusText);
        
        return res.json();
    }

    get(endpoint) {
        return this.fetchJSON(
            endpoint, 
            { 
                method: 'GET' 
            }
        )
    }
}
