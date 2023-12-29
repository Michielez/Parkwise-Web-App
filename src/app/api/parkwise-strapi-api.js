class ParkWiseStrapiAPI {
    constructor(baseURL = 'https://clownfish-app-uvizv.ondigitalocean.app/') {
        this.baseURL = baseURL;
    }

    async GET(path, params = {}) {
        const url = new URL(`${this.baseURL}${path}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    async parkings() {
        return await this.GET('api/parkings', {
            "populate[location][fields][0]": "lng",
            "populate[location][fields][1]": "lat",
            "populate[price_rates][fields][0]": "duration",
            "populate[price_rates][fields][1]": "price",
            "populate[currency][fields][0]": "name",
            "populate[currency][fields][1]": "symbol"
        });
    }
}

export default ParkWiseStrapiAPI;