import styles from './searchBar.module.css'

export default function SearchBar(){
    return (
        <input className={styles["search-bar"]} type="text" placeholder="Search" />
    )
}