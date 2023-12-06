"use client";
import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './loginForm.module.css';

const loginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const fields = [
    { label: 'E-mail', type: 'email', name: 'email' },
    { label: 'Wachtwoord', type: 'password', name: 'password' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending data to a server or updating state
    console.log(formData);
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
      <button type="submit" className={styles.registerButton}>Registreer</button>
      </div>
    </form>
  );
};

export default loginForm;
