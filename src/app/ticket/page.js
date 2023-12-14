import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PriceList from "../components/PriceList/PriceList"
import Card from "../components/Card/Card"
import MapBox from "../components/MapBox/MapBox"
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
                },{
                    minutes: 240,
                    price: 7.90
                },{
                    minutes: 300,
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
    const calculateMinutes = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diff = Math.abs(endDate - startDate);
        const minutes = Math.floor((diff / 1000) / 60);
        return minutes;
    }

    const calculateParkingPrice = (durationInMinutes,prices) => {
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
    
    
    return (
        <>
            <main>
                <h1>Ticket</h1>
                <div className={styles["flex-container"]}>
                    <Card className={styles["sessie-card"]} title="Sessie">
                        <p className={styles["card-child"]}>Auto: {huidigeSessieExample.car}</p>
                        <p className={styles["card-child"]}>Parking: {huidigeSessieExample.parking.name}</p>
                        <p className={styles["card-child"]}>Tijd: {calculateMinutes(huidigeSessieExample.duration.start, huidigeSessieExample.duration.end)}</p>
                        <p className={styles["card-child"]}>Prijs: {calculateParkingPrice(calculateMinutes(huidigeSessieExample.duration.start, huidigeSessieExample.duration.end),huidigeSessieExample.parking.prices.price)}{huidigeSessieExample.parking.prices.currency}</p>
                    </Card>
                    <PriceList classname={styles["prijzen-card"]} title="prijzen">
                        
                    </PriceList>
                </div>
                <MapBox />

            </main>
            <BottomNavigation />
        </>
    )
}