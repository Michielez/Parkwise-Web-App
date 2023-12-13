import styles from "./PriceList.module.css"
import Card from "../Card/Card"
export default function PriceList({prices}){
    console.log(prices)
    // example: {hour: '€2,00', day: '€10,00', week: '€50,00', month: '€100,00'}
    return(
        <Card title={`Prijs`}>
            <ul>
                {Object.entries(prices).map(([key, value], index) => (
                    <li key={index}>
                        <p>{key}:</p>
                        <p>{value}</p>
                    </li>
                ))}
            </ul>
        </Card>

    )
}