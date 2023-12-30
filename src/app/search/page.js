"use client";
import React, { useState, useEffect } from "react";
import MapBox from "../components/MapBox/MapBox";
import PriceList from "../components/PriceList/PriceList";
import NavigationCard from "../components/NavigationCard/NavigationCard";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import MockData from "@/app/mockData/mockData";
import ParkWiseStrapiAPI from "../api/parkwise-strapi-api";
import styles from "./search.module.css";
import useAuth from "../hooks/useAuth";
import { refactorData, currentSessionStrategy, parkingsStrategy, priceRateStrategy} from "@/app/api/apiStrategies";

export default function Search() {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showInformation, setShowInformation] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);

    const { getCookie } = useAuth();
    const authToken = getCookie('authToken');

    const ParkwiseAPI = new ParkWiseStrapiAPI(authToken);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const data = await ParkwiseAPI.getParkings();
                const parkings = refactorData(data.data, parkingsStrategy);
                console.log(parkings);
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

    useEffect(() => {
        const fetchCurrentSession = async () => {
            try {
                const data = await ParkwiseAPI.getCurrentSession();
                const session = refactorData(data.data[0], currentSessionStrategy);
                setCurrentSession(session);
            } catch (error) {
                console.error("Error fetching current session:", error);
            }
        }
        if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi") {
            fetchCurrentSession();
        } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
            setCurrentSession(MockData.account.currentSession);
        }
    }, []);

    const onMarkerClick = (marker) => {
        setSelectedMarker(marker);
        setShowInformation(true);
    };

    return (
        <>
            <main>
                <h1>Search</h1>
                <MapBox
                    currentSession={currentSession}
                    onMarkerClick={onMarkerClick}
                    markers={markers}
                />
                <div className={styles["flex-container"]}>
                    {showInformation &&
                        <PriceList className={styles["price-list"]} priceRates={selectedMarker.priceRates} />
                    }
                    {showInformation &&
                        <NavigationCard className={styles["general-information-card"]} title={"General information"}>
                            <ul>
                                <li>Address: <p>TODO</p></li>
                                <li>Parking spots: <p>{selectedMarker.capacity.total}</p></li>
                                <li>Available spots: <p>{selectedMarker.capacity.available}</p></li>
                            </ul>
                        </NavigationCard>
                    }
                </div>
            </main>
            <BottomNavigation />
        </>
    );
}
