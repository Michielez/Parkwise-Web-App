"use client";
import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './loginForm.module.css';
import ParkWise from '@/app/api/parkwise';

const loginForm = ({ handleRegisterClick }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ParkWiseAPI = new ParkWise();
        const responseData = await ParkWiseAPI.authenticate.login(
            formData.username,
            formData.password
        )
        console.log(responseData)
    };


    return (
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
            <p>Geen account? <button type="button" onClick={handleRegisterClick} className={styles.registerButton}>registreer!</button></p> 
        </form>
    );
};

export default loginForm;
