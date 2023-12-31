class ParkWiseStrapiAPI {
    constructor(authToken, baseURL = 'https://clownfish-app-uvizv.ondigitalocean.app/' ) {
        this.baseURL = baseURL;
        this.authToken = authToken;
    }
    
    async GET(path, params = {}) {
        const url = new URL(`${this.baseURL}${path}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            let headers = {
                'Content-Type': 'application/json'
            }
            if (this.authToken){
                headers.Authorization = `Bearer ${this.authToken}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `API Error: ${response.status}`);
            }
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async POST(path ,body = {}) {
        const url = new URL(`${this.baseURL}${path}`);
        try {
            let headers = {
                'Content-Type': 'application/json'
            }
            if (this.authToken){
                headers.Authorization = `Bearer ${this.authToken}`;
            }
            console.log(headers);
            console.log(JSON.stringify(body));
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message);
            }
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getParkings() {
        return await this.GET('api/parkings', {
            "populate[location][fields][0]": "lng",
            "populate[location][fields][1]": "lat",
            "populate[price_rates][fields][0]": "minutes",
            "populate[price_rates][fields][1]": "price",
            "populate[currency][fields][0]": "name",
            "populate[currency][fields][1]": "symbol",
            "populate[capacity][fields][0]": "total",
            "populate[capacity][fields][1]": "available",
            "populate[capacity][fields][2]": "taken",
        });
    }

    async getCurrentSession() {
        return await this.GET('api/current-sessions/me',{

        });
    }

    async login(username, password) {
        return await this.POST('api/auth/local', {
            identifier: username,
            password
        });
    }

    async register(formData){
        return await this.POST('api/auth/local/register', formData);
    }
}

export default ParkWiseStrapiAPI;