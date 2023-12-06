import styles from './title.module.css'

export default function Tilte({title}){
    return(
        <>
            <h1 className={styles.title}>{title}</h1>
        </>
    )
}