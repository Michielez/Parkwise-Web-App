"use client";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PriceList from "../components/PriceList/PriceList"
import MapBox from "../components/MapBox/MapBox"
import SessionCard from "../components/SessionCard/SessionCard"
import MockData from "@/app/mockData/mockData"
import { useEffect, useState } from 'react';
import useAuth from "../hooks/useAuth";

import styles from "./ticket.module.css"
import NavigateButton from "../components/NavigateButton/NavigateButton";
import ParkwiseStrapiAPI from "@/app/api/parkwise-strapi-api"

import { refactorData, currentSessionStrategy, parkingsStrategy } from "@/app/api/apiStrategies";



export default function Ticket({ }) {
    const [markers, setMarkers] = useState([]);
    const [currentSession, setCurrentSession] = useState();
    const [address, setAddress] = useState('');
    const { loggedIn, updateLoggedIn, getCookie } = useAuth();

    const authToken = getCookie("authToken");
    const ParkwiseAPI = new ParkwiseStrapiAPI(authToken);

    const onMarkerClick = () => {

    }

    useEffect(() => {
        const fetchCurrentSession = async () => {
            const data = await ParkwiseAPI.getCurrentSession();
            if (data.data[0]) {
                const session = refactorData(data.data[0], currentSessionStrategy);
                setCurrentSession(session);
            }
        }
        if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi" && loggedIn) {
            fetchCurrentSession();
        } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
            setCurrentSession(MockData.account.currentSession);
        }

    }, [loggedIn]);

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
                setAddress(data.features[0].place_name);

            } catch (error) {
                console.error(error);
            }
        };

        if (currentSession) {
            fetchAddress();
        }
    }, [currentSession]);
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const data = await ParkwiseAPI.getParkings();
                const parkings = refactorData(data.data, parkingsStrategy);
                setMarkers(parkings);
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };
        if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi") {
            fetchMarkers();
        } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
            setMarkers(MockData.parkings);
        }

    }, []);
    if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi") {
        if (currentSession && loggedIn) {
            return (
                <>
                    <main>
                        <h1>Ticket</h1>
                        <div className={styles["flex-container"]}>
                            <SessionCard session={currentSession} />
                            <PriceList
                                priceRates={currentSession.parking.priceRates}
                                currency={currentSession.parking.currency.symbol}
                                classname={styles["prijzen-card"]}
                                title="Prices" />
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
                            markers={markers}
                        />
                    </main>
                    <BottomNavigation />
                </>
            );
        } else if (!currentSession && loggedIn) {
            return (
                <>
                    <main>
                        <h1>Ticket</h1>
                        <p>You're currently not parked!</p>
                    </main>
                    <BottomNavigation />
                </>
            )
        } else if (!loggedIn) {
            return (
                <>
                    <main>
                        <h1>Ticket</h1>
                        <p>You'll have to login!</p>
                    </main>
                    <BottomNavigation />
                </>
            )
        }
    } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
        return (
            <>
                <main>
                    <h1>Ticket</h1>
                    <div className={styles["flex-container"]}>
                        <SessionCard session={currentSession} />
                        <PriceList
                            priceRates={currentSession.parking.priceRates}
                            currency={currentSession.parking.currency.symbol}
                            classname={styles["prijzen-card"]}
                            title="Prices" />
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
                        markers={markers}
                    />
                </main>
                <BottomNavigation />
            </>
        );
    }
}
