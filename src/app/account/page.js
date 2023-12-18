"use client";

import React, { useState } from 'react';


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

    return (
        <>
        <main>
            <h1>Account</h1>
            
            {!showRegisterForm && !loggedIn && <LoginForm handleRegisterClick={handleRegisterClick} />}
            {showRegisterForm && !loggedIn && <RegisterForm handleCancel={handleCancelClick} />}
            {loggedIn && <p></p>}
        </main>
        <BottomNavigation />
        </>
    )
}