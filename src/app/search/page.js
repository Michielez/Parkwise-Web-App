"use client";
import { useState } from "react"
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import MapBox from "../components/MapBox/MapBox"
import PriceList from "../components/PriceList/PriceList"

export default function Search(){

    const [prices, setPrices] = useState(null)
    const [showPriceList, setShowPriceList] = useState(false)

    const onMarkerClick = (marker) => {
        marker.type == "parking";
        console.log(marker);
        setPrices(marker.priceRates);
        setShowPriceList(true);
    }

    return(
        <>
        <main>
            <h1>Search</h1>
            <MapBox onMarkerClick = {onMarkerClick}/>
            {showPriceList && <PriceList priceRate = {prices}/>}
        </main>
        <BottomNavigation />
        </>
    )
}