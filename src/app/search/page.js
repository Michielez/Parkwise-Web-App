"use client";
import { useState } from "react"
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import MapBox from "../components/MapBox/MapBox"
import PriceList from "../components/PriceList/PriceList"
import styles from "./search.module.css"
import NavigationCard from "../components/NavigationCard/NavigationCard";

import MockData from "@/app/mockData/mockData"
import Card from "../components/Card/Card";

export default function Search(){

    const [marker, setMarker] = useState(null)
    const [showInformation, setShowInformation] = useState(false)

    const onMarkerClick = (marker) => {
        setMarker(marker);
        setShowInformation(true);
    }

    return(
        <>
        <main>
            <h1>Search</h1>
            <MapBox 
                currentSession={MockData.account.currentSession} 
                onMarkerClick = {onMarkerClick}
            />
            <div className={styles["flex-container"]}>
                {showInformation && <PriceList className={styles["price-list"]} priceRate={marker.priceRates}/>}
                {showInformation && 
                    <NavigationCard className={styles["general-information-card"]} title={"General information"}> 
                        <ul>
                            <li>Address: <p>Anne Frankstraat 17, 8870 Izegem, West Flanders, Belgium</p></li>
                            <li>Parkeer plaatsen: <p>150</p></li>
                            <li>Vrije plaatsen: <p>29</p></li>
                        </ul>
                    </NavigationCard>
                }
            </div>
            
        </main>
        <BottomNavigation />
        </>
    )
}