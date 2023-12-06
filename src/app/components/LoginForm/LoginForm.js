"use client";
import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './loginForm.module.css';

const loginForm = ({handleRegisterClick}) => {
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
      
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        };
      
        try {
          const response = await fetch('https://api.parkwise.be/auth/login', requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          console.log(data);
        } catch (error) {
          console.error('There was an error!', error);
        }
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
            <div className={styles.formButtons}>
                <button type="submit" className={styles.loginButton}>Login</button>
                <button type="button" onClick={handleRegisterClick} className={styles.registerButton}>Registreer</button>
            </div>
        </form>
    );
};

export default loginForm;
