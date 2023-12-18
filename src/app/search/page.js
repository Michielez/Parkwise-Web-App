"use client";
import { useState } from "react"
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import MapBox from "../components/MapBox/MapBox"
import PriceList from "../components/PriceList/PriceList"

import MockData from "@/app/mockData/mockData"
import GoogleMapsNavigateToButton from "../components/GoogleMapsNavigateToButton/GoogleMapsNavigateToButton";

export default function Search(){

    const [marker, setMarker] = useState(null)
    const [showPriceList, setShowPriceList] = useState(false)

    const onMarkerClick = (marker) => {
        setMarker(marker);
        setShowPriceList(true);
    }

    return(
        <>
        <main>
            <h1>Search</h1>
            <MapBox 
                currentSession={MockData.account.currentSession} 
                onMarkerClick = {onMarkerClick}
            />
            {showPriceList && <PriceList priceRate ={marker.priceRates}/>}
            {showPriceList && <GoogleMapsNavigateToButton location={marker.location}/>}
        </main>
        <BottomNavigation />
        </>
    )
}