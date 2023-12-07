"use client";

import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MapBox from '../MapBox/MapBox';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;

export default function MapBoxWithSearch() {
    const [location, setLocation] = useState(null);

    const handleSearchChange = async (searchInput) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${mapboxgl.accessToken}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { features } = data;
            if (features && features.length > 0) {
                setLocation(features[0].center); // Set search result to be used in MapBox component
            } else {
                console.error('Location not found.');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <>
            <SearchBar onSearchChange={handleSearchChange} placeholder={"Brugge"}/>
            <MapBox location={location} />
        </>
    );
}
