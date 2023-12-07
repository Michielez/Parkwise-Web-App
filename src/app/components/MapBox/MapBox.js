"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;
const markerSize = 25;
export default function MapBox({ location, markers }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11', //TODO: Change style
            center: [3.224700, 51.209348], //TODO: Default center Bruges [lng, lat] 
            zoom: 9 //TODO: Default zoom
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        markerRef.current = new mapboxgl.Marker();

        return () => mapRef.current.remove();
    }, []);

    useEffect(() => {
        if (location && mapRef.current) {
            markerRef.current.setLngLat(location).addTo(mapRef.current);
            mapRef.current.flyTo({
                center: location,
                essential: true,
                zoom: 14
            })
        }
    }, [location])

    useEffect(() => {
        if (markers && mapRef.current) {
            markers.forEach(marker => {

                const el = document.createElement('div');
                el.className = 'custom-marker'
                el.style.backgroundImage = 'url(' + marker.imageUrl + ')';
                el.style.width = markerSize + 'px';
                el.style.height = markerSize + 'px';
                el.style.backgroundSize = 'cover';
                new mapboxgl.Marker(el)
                    .setLngLat([marker.location.lng, marker.location.lat])
                    .setPopup(new mapboxgl.Popup({offset: markerSize/2}).setHTML(`<h3>${marker.name}</h3>`))
                    .addTo(mapRef.current);
            });
        }
    }, [markers])

    return <div ref={mapContainerRef} className='map-container' style={{ width: '100%', height: '400px' }} />;
};
