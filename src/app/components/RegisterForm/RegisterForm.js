import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './registerForm.module.css';
import ParkwiseAPI from '../../api/parkwise-strapi-api';

const RegisterForm = ({ handleCancel, handleRegister }) => {

  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    tel: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    language: '',
    car: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);
  const fields = {
    user: [
      { label: 'Username', type: 'text', name: 'username' },
      { label: 'Voornaam', type: 'text', name: 'firstname' },
      { label: 'Achternaam', type: 'text', name: 'lastname' },
      { label: 'Wachtwoord', type: 'password', name: 'password' },
      { label: 'Language', type: 'text', name: 'language' },
      { label: 'License plate', type: 'text', name: 'car' },
    ],
    contactInformation: [
      { label: 'E-mail', type: 'email', name: 'email' },
      { label: 'Tel', type: 'tel', name: 'tel' },
    ],
    location: [
      { label: 'Address', type: 'text', name: 'address' },
      { label: 'Stad', type: 'text', name: 'city' },
      { label: 'Postcode', type: 'number', name: 'zip' },
      { label: 'Land', type: 'text', name: 'country' }
    ]
  };

  const sections = Object.keys(fields);
  const currentFields = fields[sections[currentStep]];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password' && !checkPassword(value)) {
      setErrorMessages(['Password must have at least 6 characters!']);
    } else {
      setErrorMessages([]);
    }
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

  const formatFormData = (formData) => {
    const formattedFormData = {};
    for (const key in formData) {
      if (formData[key]) {
        formattedFormData[key] = formData[key];
      }
    }

    return formattedFormData;
  };
  function setCookieWithJwtExpiry(jwt) {
    const payload = jwt.split('.')[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const expDate = new Date(payloadObj.exp * 1000);

    document.cookie = `authToken=${jwt}; expires=${expDate.toUTCString()}; SameSite=Lax`;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parkwiseAPI = new ParkwiseAPI();
    const formattedData = formatFormData(formData);
    try {
      const user = await parkwiseAPI.register(formattedData);
      setCookieWithJwtExpiry(user.jwt);
      handleRegister();
    } catch (error) {
      setErrorMessages([])
      if (error.details.errors) {
        const newErrorMessages = error.details.errors.map(err => err.message.replace("identifier", "username"));
        setErrorMessages(newErrorMessages);
      } else {
        setErrorMessages([error.message.replace("identifier", "username")]);
      }
    }

  };

  const checkPassword = () => {
    const leastCharacters = 5;
    const password = formData.password;
    if (password.length < leastCharacters) {
      return false;
    }
    return true;
  }

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
      <ul className={styles.errorMessages}>
        {errorMessages.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <p>Al een account? <button type="button" onClick={handleCancel} className={styles.loginButton}>Login</button></p>
    </form>
  );
};

export default RegisterForm;