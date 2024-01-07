"use client";
import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './loginForm.module.css';
import ParkwiseApi from '@/app/api/parkwise-strapi-api';

const loginForm = ({ handleRegisterClick, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMessages, setErrorMessages] = useState([]);

    const fields = [
        { label: 'Username', type: 'string', name: 'username' },
        { label: 'Wachtwoord', type: 'password', name: 'password' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };



    function setCookieWithJwtExpiry(jwt) {
        const payload = jwt.split('.')[1];
        const decodedPayload = atob(payload); // Base64 decode
        const payloadObj = JSON.parse(decodedPayload);
        const expDate = new Date(payloadObj.exp * 1000); // Convert to milliseconds

        // Set the cookie with the same expiry as the JWT
        document.cookie = `authToken=${jwt}; expires=${expDate.toUTCString()}; SameSite=Lax`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ParkWiseAPI = new ParkwiseApi();
        try {
            const responseData = await ParkWiseAPI.login(
                formData.username,
                formData.password
            )
            setCookieWithJwtExpiry(responseData.jwt);
            onSubmit();
        } catch (error) {
            setErrorMessages([])
            if (error.details.errors) {
                const newErrorMessages = error.details.errors.map(err => err.message.replace("identifier","username"));
                setErrorMessages(newErrorMessages);
            } else {
                setErrorMessages([error.message.replace("identifier", "username")]);
            }
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                {fields.map(field => (
                    <FormField
                        key={field.name}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
            <ul className={styles.errorMessages}>
                {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
            <p className={styles.geenAccount}>No account?
                <button
                    type="button"
                    onClick={handleRegisterClick}
                    className={styles.registerButton}>register!
                </button>
            </p>
        </>
    );
};

export default loginForm;
