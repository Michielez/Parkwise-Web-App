import React from 'react';
import Card from "../Card/Card";

export default function PriceList({ priceRate, currency = "€" }) {
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

    const priceRateStrategies = {
        strapi: (priceRate) => ({
            minutes: priceRate.attributes.minutes,
            price: priceRate.attributes.price
        }),
        mock: (priceRate) => ({
            minutes: priceRate.minutes,
            price: priceRate.price
        }),
        laravel: (priceRate) => {
            // TODO: Implementation for laravel
        }
    };

    function normalizePriceRate(priceRate) {
        const apiChoice = process.env.NEXT_PUBLIC_API_CHOICE;
        const strategy = priceRateStrategies[apiChoice];
    
        if (!strategy) {
            console.error(`No strategy defined for API choice: ${apiChoice}`);
            return null;
        }
    
        return strategy(priceRate);
    }

    return (
        <Card title={`Prijs`}>
            <ul>
                {priceRate.map((rate, index) => {
                    const normalizedRate = normalizePriceRate(rate);
                    return (
                        <li key={index}>
                            <p>{formatDuration(parseInt(normalizedRate.minutes))}: </p>
                            <p>{currency}{parseFloat(normalizedRate.price).toFixed(2)}</p>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
}
