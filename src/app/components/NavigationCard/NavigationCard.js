import styles from './navigateCard.module.css'

import NavigateButton from '../NavigateButton/NavigateButton'

export default function NavigationCard({ title, children, location }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                <h2>{title}</h2>
                <NavigateButton location={location} />
            </div>
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    )
}
