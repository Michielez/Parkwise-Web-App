import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PriceList from "../components/PriceList/PriceList"
import Card from "../components/Card/Card"
import MapBox from "../components/MapBox/MapBox"
import SessionCard from "../components/SessionCard/SessionCard"
import MockData from "@/app/mockData/mockData"


import styles from "./ticket.module.css"


export default function Ticket({currentSession = MockData.account.currentSession}) {
    return (
        <>
            <main>
                <h1>Ticket</h1>
                <div className={styles["flex-container"]}>
                    <SessionCard session={currentSession} />
                    <PriceList priceRate={currentSession.parking.priceRates} currency={currentSession.parking.currency} classname={styles["prijzen-card"]} title="prijzen" />
                </div>
                <MapBox />

            </main>
            <BottomNavigation />
        </>
    )
}