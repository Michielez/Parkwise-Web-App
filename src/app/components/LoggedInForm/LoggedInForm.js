import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import styles from "./LoggedInForm.module.css"

export default function LoggedInForm({ initialFormData }) {
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

    const handleSubmit = async (e) => {

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const refactorInitialFormData = (data) => {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = data[key] === null ? "" : data[key];
            return acc;
        }, {});
    }

    useEffect(() => {
        const refactored = refactorInitialFormData(initialFormData);
        setFormData(refactored);
    }, [initialFormData]);

    const fields = {
        User: [
            { label: 'Username', type: 'text', name: 'username', disabled: true },
            { label: 'Firstname', type: 'text', name: 'firstname' },
            { label: 'Lastname', type: 'text', name: 'lastname' },
            { label: 'Language', type: 'text', name: 'language' },
            { label: 'License plate', type: 'text', name: 'car' },
        ],
        Contact: [
            { label: 'E-mail', type: 'email', name: 'email' },
            { label: 'Tel', type: 'tel', name: 'tel' },
        ],
        Location: [
            { label: 'Address', type: 'text', name: 'address' },
            { label: 'City', type: 'text', name: 'city' },
            { label: 'Zip', type: 'number', name: 'zip' },
            { label: 'Country', type: 'text', name: 'country' }
        ]
    };


    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {Object.keys(fields).map(sectionKey => {
                const currentFields = fields[sectionKey];
                return (
                    <div key={sectionKey} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{sectionKey}</h2>
                        {currentFields.map(field => (
                            <FormField
                                key={field.name}
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                disabled={field.disabled}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                );
            })}
        <button type="submit" className={styles.SaveButton}>Save</button>
        </form>
    );
}