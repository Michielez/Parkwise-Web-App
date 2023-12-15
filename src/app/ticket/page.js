import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PriceList from "../components/PriceList/PriceList"
import Card from "../components/Card/Card"
import MapBox from "../components/MapBox/MapBox"
import SessionCard from "../components/SessionCard/SessionCard"

import styles from "./ticket.module.css"

const huidigeSessieExample = {
    id: 1,
    car: "1-ABC-123",
    parking: {
        id: 1,
        type: "parking",
        prices: {
            currency: "€",
            price: [
                {
                    minutes: 60,
                    price: 0.00
                },
                {
                    minutes: 120,
                    price: 3.80
                }, {
                    minutes: 180,
                    price: 5.80
                }, {
                    minutes: 240,
                    price: 7.90
                }, {
                    minutes: 300,
                    price: 10.00
                }, {
                    minutes: 330,
                    price: 10.00
                }, {
                    minutes: 360,
                    price: 10.00
                }, {
                    minutes: 390,
                    price: 10.00
                }],
        },
        location: {
            lng: 3.21878,
            lat: 50.93014,
        },
        name: "Zottekot",
        imageUrl: "/parking-icon.svg"
    },
    duration: {
        start: "2021-05-05T14:00:00.000Z",
        end: "2021-05-05T15:00:00.000Z"
    }
}


export default function Ticket() {
    


    return (
        <>
            <main>
                <h1>Ticket</h1>
                <div className={styles["flex-container"]}>
                    <SessionCard session={huidigeSessieExample} />
                    <PriceList prices={huidigeSessieExample.parking.prices} classname={styles["prijzen-card"]} title="prijzen" />
                </div>
                <MapBox />

            </main>
            <BottomNavigation />
        </>
    )
}