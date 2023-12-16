import styles from "./sessionCard.module.css"
import Card from "../Card/Card"
import Image from "next/image"

import IconCarWhite from "public/car-white.svg"
import IconMoneyWhite from "public/money-white.svg"
import IconTimeWhite from "public/time-white.svg"
import IconParkingWhite from "public/parking-white-icon.svg"

export default function SessionCard({ session }) {
    const calculateMinutes = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diff = Math.abs(endDate - startDate);
        const minutes = Math.floor((diff / 1000) / 60);
        return minutes;
    }

    const calculateParkingPrice = (durationInMinutes, priceRate) => {
        // Convert the priceRate object to an array of [minutes, price] pairs
        let priceEntries = Object.entries(priceRate).map(([minutes, price]) => ({
            minutes: parseInt(minutes),
            price
        }));
    
        // Sort the price entries in ascending order of minutes
        priceEntries.sort((a, b) => a.minutes - b.minutes);
    
        // Default to the highest price if the duration exceeds all tiers
        let calculatedPrice = priceEntries[priceEntries.length - 1].price;
    
        // Iterate over the price entries to find the right tier
        for (let entry of priceEntries) {
            if (durationInMinutes <= entry.minutes) {
                calculatedPrice = entry.price;
                break; // Stop the loop once the correct tier is found
            }
        }
    
        return calculatedPrice;
    };
    

    const refactorMinutes = (minutes) => {
        let hours = Math.floor(minutes / 60);
        let restMinutes = minutes % 60;
        return `${hours}u ${restMinutes}m`;
    }
    return (
        <Card className={styles["sessie-card"]} title="Sessie">
          <ul>
            <li className={styles["card-child"]}><Image src={IconParkingWhite} /> {session.parking.name}</li>
            <li className={styles["card-child"]}><Image src={IconCarWhite} /> {session.car}</li>
            <li className={styles["card-child"]}><Image src={IconTimeWhite} /> {refactorMinutes(calculateMinutes(session.duration.start, session.duration.end))}</li>
            <li className={styles["card-child"]}><Image src={IconMoneyWhite} /> {session.parking.currency}{calculateParkingPrice(calculateMinutes(session.duration.start, session.duration.end), session.parking.priceRates)}</li>
            </ul>
        </Card>
    )
} 