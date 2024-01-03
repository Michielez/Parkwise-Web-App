import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import styles from "./LoggedInForm.module.css"
import ParkwiseAPI from "../../api/parkwise-strapi-api";
import useAuth from "../../hooks/useAuth";

export default function LoggedInForm({ initialFormData, onCancelClick }) {
    const { getCookie } = useAuth();
    const authToken = getCookie("authToken");
    const parkwiseAPI = new ParkwiseAPI(authToken);
    const [changedFields, setChangedFields] = useState({});
    const [saveSuccesFull, setSaveSuccesFull] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
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
        async function updateUserInfo() {
            const userId = initialFormData.id;
            e.preventDefault();
            try {
                await parkwiseAPI.updateUserInfo(userId, changedFields);
                setSaveSuccesFull("Succesfully saved");
                setChangedFields({});
            } catch (error) {
                setErrorMessages([])
                const newErrorMessages = error.details.errors.map(err => err.message.replace("identifier", "username"));
                setErrorMessages(newErrorMessages);
            }
            
        }
        if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi") {
            updateUserInfo();
        } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
            console.log("Mock update user info");
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        setChangedFields(prevState => ({
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
            { label: 'Firstname', type: 'text', name: 'firstname', disabled: true },
            { label: 'Lastname', type: 'text', name: 'lastname', disabled: true },
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
            <div className={styles.buttons}>
                <button type="submit" className={styles.button}>Save</button>
                <button type="button" className={styles.button} onClick={onCancelClick}>Cancel</button>
            </div>
            <ul className={styles.errorMessages}>
                {errorMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <p>{saveSuccesFull}</p>
        </form>
    );
}