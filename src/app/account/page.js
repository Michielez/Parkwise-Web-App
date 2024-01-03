"use client";

import { useState, useEffect } from 'react';


import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"
import useAuth from "../hooks/useAuth";
import ParkwiseAPI from "../api/parkwise-strapi-api";
import LoggedInForm from "../components/LoggedInForm/LoggedInForm";

export default function Account() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { loggedIn, updateLoggedIn, getCookie, authChecked } = useAuth();

    const authToken = getCookie("authToken");
    const parkwiseAPI = new ParkwiseAPI(authToken);

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    }

    const handleCancelClick = () => {
        setShowRegisterForm(false);
    }

    const logOut = () => {
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        updateLoggedIn()
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi") {
                if (loggedIn) {
                    const user = await parkwiseAPI.getUserInfo();
                    setUserInfo(user);
                }
            } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
                setUserInfo(MockData.account.userInfo);
            }
        }
        if (loggedIn) {
            fetchUserInfo();
        }
    }, [loggedIn]);

    const isUserInfoFetched = () => Object.keys(userInfo).length > 0;
    return (
        <>
            <main>
                <h1>Account</h1>
                {
                    !showRegisterForm &&
                    !loggedIn &&
                    authChecked &&
                    <LoginForm handleRegisterClick={handleRegisterClick} onSubmit={updateLoggedIn} />
                }
                {
                    showRegisterForm &&
                    !loggedIn &&
                    authChecked &&
                    <RegisterForm handleCancel={handleCancelClick} handleRegister={updateLoggedIn} />
                }
                {
                    loggedIn && authChecked && isUserInfoFetched() && (
                        <>
                            <p>You're logged in, {userInfo.username}</p>
                            <button type='button' onClick={logOut}>Log out</button>
                            <LoggedInForm initialFormData={userInfo} />
                        </>
                    )
                }
            </main>
            <BottomNavigation />
        </>
    )
}