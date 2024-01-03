import { useState, useEffect } from 'react';

export default function useAuth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    const updateLoggedIn = () =>{
        const authToken = getCookie('authToken');
        setLoggedIn(authToken !== null);
        setAuthChecked(true);
    };

    useEffect(() => {
        updateLoggedIn();
    }, []);

    const getCookie = (name) => {
        if (typeof document === 'undefined') {
            return null; // Avoid server-side execution
        }
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    };

    return {loggedIn, updateLoggedIn, getCookie, authChecked};
};


