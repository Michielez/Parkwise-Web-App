"use client";
import { useState } from "react"
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import MapBox from "../components/MapBox/MapBox"
import PriceList from "../components/PriceList/PriceList"
import styles from "./search.module.css"

import MockData from "@/app/mockData/mockData"
import GoogleMapsNavigateToButton from "../components/GoogleMapsNavigateToButton/GoogleMapsNavigateToButton";
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
                {showInformation && <Card className={styles["general-information-card"]} title={"General information"}> 
                        <GoogleMapsNavigateToButton location={marker.location}/>    
                        <ul>
                            <li>Address: <p>Anne Frankstraat 17, 8870 Izegem, West Flanders, Belgium</p></li>
                            <li>Parkeer plaatsen: <p>150</p></li>
                            <li>Vrije plaatsen: <p>29</p></li>
                        </ul>
                    </Card>}
            </div>
            
        </main>
        <BottomNavigation />
        </>
    )
}