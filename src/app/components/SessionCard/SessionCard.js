import styles from "./sessionCard.module.css"
import Card from "../Card/Card"
import Image from "next/image"

import CarIcon from "/public/icons/black/car.svg"
import MoneyIcon from "/public/icons/black/money.svg"
import TimeIcon from "/public/icons/black/time.svg"
import ParkingIcon from "/public/icons/black/person.svg"
import TemperatureIcon from "/public/icons/black/temperature.svg"

export default function SessionCard({ session }) {
    const calculateMinutes = (start, end) => {
        if (end === null) {
            end = new Date();
        }
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diff = Math.abs(endDate - startDate);
        const minutes = Math.floor((diff / 1000) / 60);
        return minutes;
    }

    const calculateParkingPrice = (durationInMinutes, priceRate) => {
        priceRate.sort((a, b) => a.minutes - b.minutes);

        let calculatedPrice = priceRate[priceRate.length - 1].price;

        for (let entry of priceRate) {
            if (durationInMinutes <= entry.minutes) {
                calculatedPrice = entry.price;
                break;
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
                <li className={styles["card-child"]}><Image src={ParkingIcon} alt="Parking icon" /> {session.parking.name}</li>
                <li className={styles["card-child"]}><Image src={CarIcon} alt="Car icon" /> {session.car}</li>
                <li className={styles["card-child"]}><Image src={TimeIcon} alt="Time icon" /> {refactorMinutes(calculateMinutes(session.duration.start, session.duration.end))}</li>
                <li className={styles["card-child"]}><Image src={MoneyIcon} alt="Money icon" /> {session.parking.currency.symbol}{calculateParkingPrice(calculateMinutes(session.duration.start, session.duration.end), session.parking.priceRates)}</li>
                <li className={styles["card-child"]}><Image src={TemperatureIcon} alt="Temperature icon" />{session.parking.temperature} °C</li>
            </ul>
        </Card>
    )
} 