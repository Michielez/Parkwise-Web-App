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

    const calculateParkingPrice = (durationInMinutes, prices) => {
        // Sort the prices array in ascending order of minutes
        let sortedPrices = prices.sort((a, b) => a.minutes - b.minutes);

        // Default to the highest price if the duration exceeds all tiers
        let calculatedPrice = sortedPrices[sortedPrices.length - 1].price;

        // Iterate over the prices to find the right tier
        for (let i = 0; i < sortedPrices.length; i++) {
            if (durationInMinutes <= sortedPrices[i].minutes) {
                calculatedPrice = sortedPrices[i].price;
                break; // Stop the loop once the correct tier is found
            }
        }

        return calculatedPrice;
    }

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
            <li className={styles["card-child"]}><Image src={IconMoneyWhite} /> {calculateParkingPrice(calculateMinutes(session.duration.start, session.duration.end), session.parking.prices.price)}{session.parking.prices.currency}</li>
            </ul>
            </Card>
    )
} 