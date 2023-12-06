import styles from './searchBar.module.css'

export default function SearchBar({onChange}){
    return (
        <input onChange={onChange} className={styles["search-bar"]} type="text" placeholder="Search" />
    )
}