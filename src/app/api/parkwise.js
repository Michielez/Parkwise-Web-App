class ParkWise {
    constructor(baseURL = 'https://api.parkwise.be', language = 'en') {
        this.baseURL = baseURL;
        this.language = language;
        this.info = async () => {
            const response = await fetch(`${baseURL}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            try {
                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    console.error(data.cause || 'An error occurred during getting the info.');
                    throw new Error(data.cause || 'An error occurred during getting the info.');
                }
            } catch (error){
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                throw error;
            }
        }
        this.authenticate = {
            register: async (username, password, first_name, email, phone, address, city, zip, country_id) => {
                const response = await fetch(`${baseURL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, first_name, email, phone, address, city, zip, country_id })
                });
            
                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during registration.');
                        throw new Error(data.cause || 'An error occurred during registration.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },            
            login: async (username, password) => {
                const response = await fetch(`${baseURL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during login.');
                        throw new Error(data.cause || 'An error occurred during login.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },
            logout: async (token) => {
                const response = await fetch(`${baseURL}/auth/logout`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during logout.');
                        throw new Error(data.cause || 'An error occurred during logout.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },
            me: async (token) => {
                const response = await fetch(`${baseURL}/auth/me`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during calling me.');
                        throw new Error(data.cause || 'An error occurred during calling me.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },
            refresh: async (token) => {
                const response = await fetch(`${baseURL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during refreshing.');
                        throw new Error(data.cause || 'An error occurred during refreshing.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            }
        }
        this.users = {
            getUsers: async (pages, page) => {
                const response = await fetch(`${baseURL}/users?pages=${pages}&page=${page}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during getting the users.');
                        throw new Error(data.cause || 'An error occurred during getting the users.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },
            postUsers: async (users) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(users)
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during posting the users.');
                        throw new Error(data.cause || 'An error occurred during posting the users.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            }
        }

        this.user = {
            getUser: async (id) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during getting the user.');
                        throw new Error(data.cause || 'An error occurred during getting the user.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },
            deleteUser: async (id) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during deleting the user.');
                        throw new Error(data.cause || 'An error occurred during deleting the user.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            },
            putUser: async (id, updates) => {
                const response = await fetch(`${baseURL}/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred during updating the user.');
                        throw new Error(data.cause || 'An error occurred during updating the user.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;
                }
            }
        }

        this.countries = {
            getCountries: async (pages, page) => {
                const response = await fetch(`${baseURL}/countries?pages=${pages}&page=${page}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || 'An error occurred getting the countries.');
                        throw new Error(data.cause || 'An error occurred getting the countries.');
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;                    
                }
            }
        }
        this.country = {
            getCountry: async (id) => {
                const response = await fetch(`${baseURL}/countries/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || `An error occurred getting country with id: ${id}.`);
                        throw new Error(data.cause || `An error occurred getting country with id: ${id}.`);
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;                    
                }

            },
            delCountry: async (id) => {
                const response = await fetch(`${baseURL}/countries/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || `An error occurred deleting country with id: ${id}.`);
                        throw new Error(data.cause || `An error occurred deleting country with id: ${id}.`);
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;                    
                }
            },
            putCountry: async (id, updates) => {
                const response = await fetch(`${baseURL}/countries/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });

                try {
                    const data = await response.json();
                    if (response.ok) {
                        return data;
                    } else {
                        console.error(data.cause || `An error occurred updating country with id: ${id}.`);
                        throw new Error(data.cause || `An error occurred updating country with id: ${id}.`);
                    }
                } catch (error) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    throw error;                    
                }
            }
        }
    }

}

export default ParkWise;
