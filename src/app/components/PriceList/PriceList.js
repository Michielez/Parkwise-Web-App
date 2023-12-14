import styles from "./PriceList.module.css"
import Card from "../Card/Card"
export default function PriceList({ prices }) {

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        let formattedDuration = '';
        if (hours > 0) {
            formattedDuration += `${hours} uur `;
        }
        if (mins > 0) {
            formattedDuration += `${mins} minuten`;
        }
        if (hours === 0 && mins === 0) {
            formattedDuration = '0 minuten';
        }

        return formattedDuration.trim();
    };

    return (
        <Card title={`Prijs`}>
            <ul>
                {prices.price.map((tier, index) => (
                    <li key={index}>
                        <p>Up to {formatDuration(tier.minutes)}: </p>
                        <p>{prices.currency}{tier.price.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </Card>
    )
}