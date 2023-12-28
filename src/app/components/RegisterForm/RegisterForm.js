import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './registerForm.module.css';
import ParkWiseAPI from '../../api/parkwise';

const RegisterForm = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country_id: ''
  });
  const [currentStep, setCurrentStep] = useState(0);

  const fields2 = {
    user: [
      { label: 'Username', type: 'text', name: 'username' },
      { label: 'Voornaam', type: 'text', name: 'first_name' },
      { label: 'Achternaam', type: 'text', name: 'last_name' },
      { label: 'Wachtwoord', type: 'password', name: 'password' },
    ],
    contactInformation: [
      { label: 'E-mail', type: 'email', name: 'email' },
      { label: 'Tel', type: 'tel', name: 'phone' },
    ],
    location: [
      { label: 'Address', type: 'text', name: 'address' },
      { label: 'Stad', type: 'text', name: 'city' },
      { label: 'Postcode', type: 'number', name: 'zip' },
      { label: 'Land', type: 'text', name: 'country_id' }
    ]
  };

  const sections = Object.keys(fields2);
  const currentFields = fields2[sections[currentStep]];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parkwiseAPI = new ParkWiseAPI();
    parkwiseAPI.authenticate.register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {currentFields.map(field => (
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
        {currentStep > 0 && (
          <button type="button" onClick={handlePrevious} className={styles.backButton}>Vorige</button>
        )}
        {currentStep < sections.length - 1 && (
          <button type="button" onClick={handleNext} className={styles.nextButton}>Volgende</button>
        )}
        {currentStep === sections.length - 1 && (
          <button type="submit" className={styles.saveButton}>Registreer</button>
        )}
      </div>
      <p>Al een account? <button type="button" onClick={handleCancel} className={styles.loginButton}>Login</button></p>
    </form>
  );
};

export default RegisterForm;
