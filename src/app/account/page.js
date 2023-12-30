"use client";

import { useState, useEffect } from 'react';


import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"
import useAuth from "../hooks/useAuth";

export default function Account() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const {loggedIn, updateLoggedIn} = useAuth();

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    }

    const handleCancelClick = () => {
        setShowRegisterForm(false);
    }

    return (
        <>
            <main>
                <h1>Account</h1>
                {
                    !showRegisterForm &&
                    !loggedIn &&
                    <LoginForm handleRegisterClick={handleRegisterClick} onSubmit={updateLoggedIn} />
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