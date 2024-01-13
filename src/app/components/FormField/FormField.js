import React from 'react';
import styles from './formField.module.css';

export default function FormField({ label, type, name, value, onChange, disabled = false }) {
  let disabledText;
  if (disabled == true) {
    disabledText = "disabled"
  } else {
    disabledText = ""
  }

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
        disabled={disabledText}
      />
    </div>
  );
};
