import React, { useState } from 'react';
import styles from './searchBar.module.css';
import Image from 'next/image';
import searchPic from 'public/white-search-icon.svg';

export default function SearchBar({ onSearchChange, placeholder }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent the form from reloading the page
        onSearchChange(searchValue); // Trigger the search
    };

    return (
        <form onSubmit={handleSearchSubmit} className={styles['search-bar-wrapper']}>
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles['search-bar']}
                type="text"
                placeholder={placeholder}
            />
            <button type="submit" className={styles['search-button']}>
                <Image
                    src={searchPic}
                    alt='Search'
                />
            </button>
        </form>
    );
}
