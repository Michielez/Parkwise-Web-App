"use client";

import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MapBox from '../MapBox/MapBox';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;

const customMarkers = [ //TODO: This is just an example, remove this
    {

        id: 1,
        location: {
            lng: 3.21878,
            lat: 50.93014,
        },        
        name: "Parking Spot 1",
        imageUrl: "/parking-icon.svg"
    },
    {

        id: 2,
        location: {
            lng: 3.20961,
            lat: 50.92927,
        },        
        name: "Parking Spot 2",
        imageUrl: "/parking-icon.svg"
    },
    {

        id: 3,
        location: {
            lng: 3.22114,
            lat: 50.92849,
        },        
        name: "Parking Spot 3",
        imageUrl: "/parking-icon.svg"
    },
    {

        id: 4,
        location: {
            lng:  3.21099,
            lat: 50.92564,
        },        
        name: "Parking Spot 4",
        imageUrl: "/parking-icon.svg"
    },
    {

        id: 5,
        location: {
            lng: 3.20922,
            lat: 50.92661,
        },        
        name: "Parking Spot 5",
        imageUrl: "/parking-icon.svg"
    }
]

export default function MapBoxWithSearch() {
    const [location, setLocation] = useState(null);

    const handleSearch = async (searchInput) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${mapboxgl.accessToken}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { features } = data;
            if (features && features.length > 0) {
                setLocation(features[0].center);
            } else {
                console.error('Location not found.');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} placeholder={"Brugge"}/>
            <MapBox location={location} markers={customMarkers}/>
        </>
    );
}
