import styles from "./navigateButton.module.css"
export default function NavigateButton({ location }) {
    const navigate = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, "_blank")
    }

    return (
            <button onClick={navigate} className={styles.button}>Navigeer naar parking</button>
    )
}