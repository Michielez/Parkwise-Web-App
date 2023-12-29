"use client";

import { useState, useEffect } from 'react';


import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"


export default function Account() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    }

    const handleCancelClick = () => {
        setShowRegisterForm(false);
    }
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }

    useEffect(() => {
        setLoggedIn(getCookie('authToken')!== null);
    })

    return (
        <>
            <main>
                <h1>Account</h1>
                {
                    !showRegisterForm &&
                    !loggedIn &&
                    <LoginForm handleRegisterClick={handleRegisterClick} handleLoginClick={() => setLoggedIn(true)} />
                }
                {
                    showRegisterForm &&
                    !loggedIn &&
                    <RegisterForm handleCancel={handleCancelClick} />
                }
                {
                    loggedIn &&
                    <p>You're logged in</p>
                }
            </main>
            <BottomNavigation />
        </>
    )
}