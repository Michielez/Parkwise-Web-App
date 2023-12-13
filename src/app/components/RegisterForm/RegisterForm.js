"use client";
import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './registerForm.module.css';
import ParkWiseAPI from '../../api/parkwise';

const RegisterForm = ({handleCancel}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    licensePlate: '',
  });

  const fields = [
    { label: 'Username', type: 'text', name: 'username' },
    { label: 'Voornaam', type: 'text', name: 'first_name' },
    { label: 'Achternaam', type: 'text', name: 'last_Name' },
    { label: 'E-mail', type: 'email', name: 'email' },
    { label: 'Wachtwoord', type: 'password', name: 'password' },
    { label: 'Tel', type: 'tel', name: 'phone' },
    { label: 'Address', type: 'text', name: 'address'},
    { label: 'Stad', type: 'text', name:'city'},
    { label: 'Postcode', type:'number', name: 'zip'},
    { label: 'Land', type: 'text', name: 'country_id'},
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
    console.log(formData);
    const parkwiseAPI = new ParkWiseAPI()
    //TODO remove when api is completed! parkwiseAPI.authenticate.register(formData.)
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
        <button type="submit" className={styles.saveButton}>Registreer</button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Terug</button>
      </div>
    </form>
  );
};

export default RegisterForm;
