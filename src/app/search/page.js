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

    const markerDataStrategies = {
        strapi: (marker) => ({
            priceRate: marker.attributes.price_rates.data
        }),
        mock: (marker) => ({
            priceRate: marker.priceRates
        }),
        laravel: (marker) => {
            //TODO: Implementation for laravel
        }
    };

    function refactorMarkerData(marker) {
        const apiChoice = process.env.NEXT_PUBLIC_API_CHOICE;
        const strategy = markerDataStrategies[apiChoice];

        if (!strategy) {
            console.error(`No strategy defined for API choice: ${apiChoice}`);
            return null;
        }

        return strategy(marker);
    }

    const onMarkerClick = (marker) => {
        console.log("Marker clicked: ", marker);
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
                    {showInformation && 
                        <PriceList className={styles["price-list"]} priceRate={refactorMarkerData(selectedMarker).priceRate}/> 
                    }
                    {showInformation && 
                        <NavigationCard className={styles["general-information-card"]} title={"General information"}> 
                            <ul>
                                <li>Address: <p>{selectedMarker.address}</p></li>
                                <li>Parking spots: <p>{selectedMarker.attributes.capacity.data.attributes.total}</p></li>
                                <li>Available spots: <p>{selectedMarker.attributes.capacity.data.attributes.available}</p></li>
                            </ul>
                        </NavigationCard>
                    }
                </div>
            </main>
            <BottomNavigation />
        </>
    );
}
