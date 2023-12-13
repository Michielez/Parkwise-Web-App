"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;
const markerSize = 25;

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


export default function MapBox({ location, markers = customMarkers, onMarkerClick}) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11', //TODO: Change style
            center: [3.224700, 51.209348], //TODO: Default center Bruges [lng, lat] 
            zoom: 14 //TODO: Default zoom
        });

        mapRef.current.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl }), 'top-left');

        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

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
                const newMarker = new mapboxgl.Marker(el)
                    .setLngLat([marker.location.lng, marker.location.lat])
                    .setPopup(new mapboxgl.Popup({offset: markerSize/2})
                    .setHTML(`<h3 style='color:black'>${marker.name}</h3>`))
                    .addTo(mapRef.current);
                newMarker.getElement().addEventListener('click', (e) => {
                    onMarkerClick(marker);
                })
            });
        }
    }, [markers])

    useEffect(()=>{
        if (navigator.geolocation && mapRef.current){
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = [position.coords.longitude, position.coords.latitude];

                const el = document.createElement('div');
                el.className = 'user-location-marker';
                el.style.width = markerSize + 'px';
                el.style.height = markerSize + 'px';
                el.style.backgroundSize = 'cover';
                el.style.backgroundImage = 'url(/user-location-icon.svg)';

                new mapboxgl.Marker(el)
                .setLngLat(userLocation)
                .addTo(mapRef.current);

                mapRef.current.flyTo({
                    center: userLocation,
                    essential: true,
                    zoom: 14
                });

            },() => {
                console.log('Error in the geolocation service.');
            })
        }
    },[])

    return <div ref={mapContainerRef} className='map-container' style={{ width: '100%', height: '400px' }} />;
};
