class ParkWise {
    constructor(baseURL = 'https://api.parkwise.be', language) {
        this.baseURL = baseURL;
        this.language = language;

        this.authenticate = {
            register: async (username, password, first_name, email, phone, address, city, zip, country_id) => {
                const response = await fetch(`${baseURL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, first_name, email, phone, address, city, zip, country_id })
                });

                const data = await response.json();
                return data;
            },
            login: async (username, password) => {
                const response = await fetch(`${baseURL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                return data;
            },
            logout: async (token) => {
                const response = await fetch(`${baseURL}/auth/logout`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                return data;
            },
            me: async (token) => {
                const response = await fetch(`${baseURL}/auth/me`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                return data;
            },
            refresh: async (token) => {
                const response = await fetch(`${baseURL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                return data;
            }
        }
        this.users = {
            getUsers: async (pages, page) => {
                const response = await fetch(`${baseURL}/users?pages=${pages}&page=${page}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                return data;
            },
            postUsers: async (users) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(users)
                });

                const data = await response.json();
                return data;
            }
        }

        this.user = {
            getUser: async (id) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                return data;
            },
            deleteUser: async (id) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                return data;
            },
            putUser: async (id, updates) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });

                const data = await response.json();
                return data;
            }
        }
    }

}


const parkwise = {
    authenticate: {

    },
    Users: {
        users: async(pages, page)
    }

};

export default parkwise;
