"use client";
import React, { useState } from 'react';
import FormField from '../FormField/FormField';

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    licensePlate: '',
  });

  const fields = [
    { label: 'Voornaam', type: 'text', name: 'firstName' },
    { label: 'Achternaam', type: 'text', name: 'lastName' },
    { label: 'E-mail', type: 'email', name: 'email' },
    { label: 'Wachtwoord', type: 'password', name: 'password' },
    { label: 'Nummerplaat', type: 'text', name: 'licensePlate' },
    // ... add other field configurations as needed
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="saveButton">Opslaan</button>
    </form>
  );
};

export default MyForm;
