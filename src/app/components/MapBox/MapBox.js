"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox CSS

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;

export default function MapBox({ location }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [3.224700, 51.209348], // Default center
            zoom: 9 // Default zoom
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        markerRef.current = new mapboxgl.Marker();

        return () => mapRef.current.remove();
    }, []);

    useEffect(() => {
        if (location && mapRef.current){
            markerRef.current.setLngLat(location).addTo(mapRef.current);
            mapRef.current.flyTo({
                center: location,
                essential: true,
                zoom: 14
            })
        }
    },[location])

    return <div ref={mapContainerRef} className='map-container' style={{ width: '100%', height: '400px' }} />;
};
