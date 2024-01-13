//TODO: If laravel has to be implemented do it in each strategy

export function refactorData(data, strategies) {
    const apiChoice = process.env.NEXT_PUBLIC_API_CHOICE;
    const strategy = strategies[apiChoice];

    if (!strategy) {
        console.error(`No strategy defined for API choice: ${apiChoice}`);
        return null;
    }

    return strategy(data);
}

export const recentTransactionsStrategy = {
    strapi: (recentTransactions) => {
        return recentTransactions.map((recentTransaction) => recentTransactionStrategy.strapi(recentTransaction));
    },
    mock: (recentTransactions) => {
        return recentTransactions.map((recentTransaction) => recentTransactionStrategy.mock(recentTransaction));
    },
    laravel: (recentTransactions) => ({})
};

export const recentTransactionStrategy = {
    strapi: (recentTransaction) => ({
        car: recentTransaction.attributes.car,
        duration: {
            start: recentTransaction.attributes.duration.data.attributes.start,
            end: recentTransaction.attributes.duration.data.attributes.end
        },
        parking: parkingStrategy.strapi(recentTransaction.attributes.parking.data),
        payment: paymentStrategy.strapi(recentTransaction.attributes.payment.data)
    }),
    mock: (recentTransaction) => ({ recentTransaction }),
    laravel: (recentTransaction) => ({})
}

export const paymentStrategy = {
    strapi: (payment) => ({
        currency: currencyStrategy.strapi(payment.attributes.currency.data),
        amount: payment.attributes.amount,
        method: payment.attributes.method,
        time: payment.attributes.time,
    }),
    mock: (payment) => ({ payment }),
    laravel: (payment) => ({})
}

export const currencyStrategy = {
    strapi: (currency) => ({
        symbol: currency.attributes.symbol,
        name: currency.attributes.name,
    }),
    mock: (currency) => ({ currency }),
    laravel: (currency) => ({})
};

export const selectedParkingStrategy = {
    strapi: (selectedParking) => ({
        priceRate: selectedParking.attributes.price_rates.data,
        capacity: selectedParking.attributes.capacity.data.attributes,
        name: selectedParking.attributes.name,
    }),
    mock: (selectedMarker) => ({ selectedMarker }),
    laravel: (selectedMarker) => ({})
};

export const parkingsStrategy = {
    strapi: (parkings) => {
        return parkings.map((parking) => parkingStrategy.strapi(parking));
    },
    mock: (parkings) => {
        return parkings.map((parking) => parkingStrategy.mock(parking));
    },
    laravel: (parkings) => ({})
}

export const parkingStrategy = {
    strapi: (parking) => ({
        priceRates: priceRatesStrategy.strapi(parking.attributes.price_rates.data),
        name: parking.attributes.name,
        type: parking.attributes.type,
        temperature: parking.attributes.temperature,
        location: {
            lat: parking.attributes.location.data.attributes.lat,
            lng: parking.attributes.location.data.attributes.lng,
        },
        capacity: {
            total: parking.attributes.capacity.data.attributes.total,
            taken: parking.attributes.capacity.data.attributes.taken,
            available: parking.attributes.capacity.data.attributes.available,
        },
        currency: {
            symbol: parking.attributes.currency.data.attributes.symbol,
            name: parking.attributes.currency.data.attributes.name,
        }
    }),
    mock: (parking) => ({ parking }),
    laravel: (marker) => ({})
};

export const priceRateStrategy = {
    strapi: (priceRate) => ({
        minutes: priceRate.attributes.minutes,
        price: priceRate.attributes.price
    }),
    mock: (priceRate) => ({ priceRate }),
    laravel: (priceRate) => ({})
};

export const priceRatesStrategy = {
    strapi(priceRates) {
        return priceRates.map((priceRate) => priceRateStrategy.strapi(priceRate));
    },
    mock(priceRates) {
        return priceRates.map((priceRate) => priceRateStrategy.mock(priceRate));
    },
    laravel: (priceRates) => ({})
}

export const currentSessionStrategy = {
    strapi: (currentSession) => (
        {
            id: currentSession.id,
            car: currentSession.attributes.car,
            parking: parkingStrategy.strapi(currentSession.attributes.parking.data),
            price: currentSession.attributes.price,
            duration: {
                start: currentSession.attributes.duration.data.attributes.start,
                end: currentSession.attributes.duration.data.attributes.end,
            }
        }
    ),
    mock: (currentSession) => ({ currentSession }),
    laravel: (currentSession) => ({})
}