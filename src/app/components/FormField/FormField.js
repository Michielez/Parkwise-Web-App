import React from 'react';
import styles from './formField.module.css';

export default function FormField({ label, type, name, value, onChange }){
  return (
    <div className={styles.formField}>
      <label htmlFor={name} className={styles.formLabel}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.formInput}
        placeholder={label}
      />
    </div>
  );
};
