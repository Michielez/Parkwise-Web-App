"use client";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PriceList from "../components/PriceList/PriceList"
import MapBox from "../components/MapBox/MapBox"
import SessionCard from "../components/SessionCard/SessionCard"
import MockData from "@/app/mockData/mockData"
import { useEffect, useState } from 'react';

import styles from "./ticket.module.css"
import NavigateButton from "../components/NavigateButton/NavigateButton";


export default function Ticket({ currentSession = MockData.account.currentSession }) {
    const [address, setAddress] = useState('');

    const onMarkerClick = () => {
        console.log("marker clicked");
    }

    useEffect(() => {
        const fetchAddress = async () => {
            const coordinates = currentSession.parking.location;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            try {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } 
                const data = await response.json();
                setAddress(data.features[0].place_name); // Set the fetched address

            } catch (error) {
                console.error(error);
            }
        };

        if (currentSession) {
            fetchAddress();
        }
    }, [currentSession]);

    if (!currentSession) {
        return (
            <>
                <main>
                    <h1>Ticket</h1>
                    <p>Er is momenteel geen actieve sessie.</p>
                </main>
                <BottomNavigation />
            </>
        );
    }

    return (
        <>
            <main>
                <h1>Ticket</h1>
                <div className={styles["flex-container"]}>
                    <SessionCard session={currentSession} />
                    <PriceList priceRate={currentSession.parking.priceRates} currency={currentSession.parking.currency} classname={styles["prijzen-card"]} title="Prijzen" />
                </div>
                <div className={styles["flex-container-address"]}>
                    <p className={styles.p}>{address}</p>
                    <NavigateButton location={currentSession.parking.location} />
                </div>
                <MapBox 
                    initialLocation={currentSession.parking.location}
                    useOwnLocation={false}
                    currentSession={currentSession} 
                    onMarkerClick={onMarkerClick}
                />
            </main>
            <BottomNavigation />
        </>
    );
}
