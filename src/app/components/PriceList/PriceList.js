import React from 'react';
import Card from "../Card/Card";

export default function PriceList({ priceRates, currency = "€" }) {
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
                {priceRates.map((rate, index) => {;
                    return (
                        <li key={index}>
                            <p>{formatDuration(parseInt(rate.minutes))}: </p>
                            <p>{currency}{parseFloat(rate.price).toFixed(2)}</p>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
}
