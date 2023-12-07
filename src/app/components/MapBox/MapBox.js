"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox CSS

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;

export default function MapBox({ searchResult }) {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [3.224700, 51.209348], // Default center
            zoom: 9 // Default zoom
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        if (searchResult) {
            map.flyTo({
                center: searchResult,
                essential: true,
                zoom: 15
            });
        }

        return () => map.remove();
    }, [searchResult]);

    return <div ref={mapContainerRef} className='map-container' style={{ width: '100%', height: '400px' }} />;
};
