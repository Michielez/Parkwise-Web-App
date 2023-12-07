"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox CSS



export default function MapboxMap() {
    mapboxgl.accessToken = "pk.eyJ1IjoibWljaGllbC1zdHJhZ2llciIsImEiOiJjbHBzZnZpN3gwM2Q5Mmpxc2IwZzU1OHB0In0.XTKi-w4ZbMXY7Q2kQ6Jbig"

    const mapContainerRef = useRef(null);

    useEffect(() => {
        // Initialize map when component mounts
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // Replace with your style URL
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [3.224700
                , 51.209348], // Starting position [lng, lat]
            zoom: 9 // Starting zoom level
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Clean up on unmount
        return () => map.remove();
    }, []); // Empty array ensures that effect runs only once

    return <div className='map-container' ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};