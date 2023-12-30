export function refactorData(data, strategies) {
    const apiChoice = process.env.NEXT_PUBLIC_API_CHOICE;
    const strategy = strategies[apiChoice];

    if (!strategy) {
        console.error(`No strategy defined for API choice: ${apiChoice}`);
        return null;
    }

    return strategy(data);
}

export const selectedParkingStrategy = {
    strapi: (selectedParking) => ({
        priceRate: selectedParking.attributes.price_rates.data,
        capacity: selectedParking.attributes.capacity.data.attributes,
        name: selectedParking.attributes.name,
    }),
    mock: (selectedMarker) => { 

    },
    laravel: (selectedMarker) => { }
};

export const parkingsStrategy = {
    strapi: (parkings) => {
        return parkings.map((parking) => parkingStrategy.strapi(parking));
    },
    mock: (parkings) => {
        return parkings.map((parking) => parkingStrategy.mock(parking));
    },
    laravel: (parkings) => {}
}

export const parkingStrategy = {
    strapi (parking) {
        return {
        priceRates: priceRatesStrategy.strapi(parking.attributes.price_rates.data),
        name: parking.attributes.name,
        type: parking.attributes.type,
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
    }
    },
    mock: (parking) => ({
        priceRate: parking.priceRates,
        name: parking.name,
        type: parking.type,
        location: parking.location,
        capacity: parking.capacity
    }),
    laravel: (marker) => {
        //TODO: Implementation for laravel
    }
};

export const markersStrategy = {
    strapi: (markers) => markers.map((marker) => selectedMarkerStrategy.strapi(marker)),
    mock: (markers) => markers.map((marker) => selectedMarkerStrategy.mock(marker)),
    laravel: (markers) => {}
}

export const priceRateStrategy = {
    strapi: (priceRate) => ({
        minutes: priceRate.attributes.minutes,
        price: priceRate.attributes.price
    }),
    mock: (priceRate) => ({
        minutes: priceRate.minutes,
        price: priceRate.price
    }),
    laravel: (priceRate) => {
        //TODO: Implementation for laravel
    }
};

export const priceRatesStrategy = {
    strapi(priceRates) {
        return priceRates.map((priceRate) => priceRateStrategy.strapi(priceRate));
    },
    mock(priceRates) {
        return priceRates.map((priceRate) => priceRateStrategy.mock(priceRate));
    },
    laravel: (priceRates) => {
        
    }
}

export const currentSessionStrategy = {
    strapi: (currentSession) => {
        return {
            id: currentSession.id,
            car: currentSession.attributes.car,
            parking: parkingStrategy.strapi(currentSession.attributes.parking.data),
            price: currentSession.attributes.price,
            duration: {
                start: currentSession.attributes.duration.data.attributes.start,
                end: currentSession.attributes.duration.data.attributes.end,
            }
        }
    },
    mock: (currentSession) => {
        return {
            id: currentSession.id,
            parking: currentSession.parking,
            startTime: currentSession.startTime,
            endTime: currentSession.endTime,
            price: currentSession.price,
            currency: currentSession.currency,
            status: currentSession.status,
        }
    },
    laravel: (currentSession) => {}
}