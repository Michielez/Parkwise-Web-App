"use client";
import React, { useState, useEffect } from "react";
import MapBox from "../components/MapBox/MapBox";
import PriceList from "../components/PriceList/PriceList";
import NavigationCard from "../components/NavigationCard/NavigationCard";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import MockData from "@/app/mockData/mockData";
import ParkWiseStrapiAPI from "../api/parkwise-strapi-api";
import styles from "./search.module.css";

export default function Search() {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showInformation, setShowInformation] = useState(false);

    const ParkwiseAPI = new ParkWiseStrapiAPI();

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const data = await ParkwiseAPI.parkings();
                setMarkers(data.data); // Assuming 'data' is an array of markers
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };

        fetchMarkers();
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
                    currentSession={MockData.account.currentSession}
                    onMarkerClick={onMarkerClick}
                    markers={markers}
                />
                <div className={styles["flex-container"]}>
                    {showInformation && <PriceList className={styles["price-list"]} priceRate={selectedMarker.priceRates} />}
                    {showInformation && 
                        <NavigationCard className={styles["general-information-card"]} title={"General information"}> 
                            <ul>
                                <li>Address: <p>{selectedMarker.address}</p></li>
                                <li>Parking spots: <p>{selectedMarker.totalSpots}</p></li>
                                <li>Available spots: <p>{selectedMarker.availableSpots}</p></li>
                            </ul>
                        </NavigationCard>
                    }
                </div>
            </main>
            <BottomNavigation />
        </>
    );
}
