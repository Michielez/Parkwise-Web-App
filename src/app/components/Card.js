import styles from './card.module.css'

export default function Card({ title, children }) {
    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    )
}
