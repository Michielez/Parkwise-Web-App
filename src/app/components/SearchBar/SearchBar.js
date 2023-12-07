import styles from './searchBar.module.css';
import Image from 'next/image';

import searchPic from 'public/white-search-icon.svg';

export default function SearchBar({ onChange }) {
    return (
        <div className={styles['search-bar-wrapper']}>
            <input
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles['search-bar']}
                type="text"
                placeholder="Brugse Poort"
            />
            <Image
                className={styles['search-icon']}
                src={searchPic}
                alt='search glass'
            />

        </div>
    );
}
