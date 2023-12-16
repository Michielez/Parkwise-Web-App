const parkings = [
    {
        id: 1,
        type: "parking",
        currency: "€",
        priceRates: {
            60: 0.00,
            120: 3.80,
            180: 5.80,
            240: 7.90,
            300: 10.00,
        },
        location: {
            lng: 3.21878,
            lat: 50.93014,
        },
        name: "Zottekot",
    },
    {
        id: 2,
        type: "parking",
        currency: "€",
        priceRates: {
            60: 1.00,
            120: 4.00,
            180: 6.00,
            240: 8.00,
            300: 10.00,
        },
        location: {
            lng: 3.23000,
            lat: 50.92700,
        },
        name: "Izegem Central",
    },
    {
        id: 3,
        type: "parking",
        currency: "€",
        priceRates: {
            60: 1.50,
            120: 3.50,
            180: 5.50,
            240: 7.50,
            300: 9.50,
        },
        location: {
            lng: 3.21000,
            lat: 50.92500,
        },
        name: "Brugge Gate",
    },
    {
        id: 4,
        type: "parking",
        currency: "€",
        priceRates: {
            60: 2.00,
            120: 4.50,
            180: 6.50,
            240: 8.50,
            300: 10.50,
        },
        location: {
            lng: 3.22900,
            lat: 50.92100,
        },
        name: "The Green Lot",
    },
    {
        id: 5,
        type: "parking",
        currency: "€",
        priceRates: {
            60: 0.50,
            120: 2.50,
            180: 4.50,
            240: 6.50,
            300: 8.50,
        },
        location: {
            lng: 3.22200,
            lat: 50.92000,
        },
        name: "Roeselare Road",
    }
];
const account = {
    username: "Michiel",
    firstName: "Michiel",
    lastName: "Stragier",
    email:"Michiel.stragier@student.howest.be",
    tel: "0470 12 34 56",
    address: "Kortrijksestraat 123",
    city: "Roeselare",
    zip: "8800",
    country: "Belgium",
    currentSession: {
        id: 1,
        car: "1-ABC-123",
        parking: {
            id: 1,
            name: "Zottekot",
            currency: "€",
            location: {
                lng: 3.21878,
                lat: 50.93014,
            },
            priceRates: {
                60: 0.00,
                120: 3.80,
                180: 5.80,
                240: 7.90,
                300: 10.00,
            }

        },
        duration: {
            start: "2021-05-05T14:00:00.000Z",
            end: "2021-05-05T15:00:00.000Z"
        }
    },
    recentTransactions: [
        {
            car: "1-ABC-123",
            duration: {
                start: "2021-05-05T14:00:00.000Z",
                end: "2021-05-05T15:00:00.000Z"
            },
            parking: {
                id: 1,
                name: "Zottekot",
                currency: "€",
                location: {
                    lng: 3.21878,
                    lat: 50.93014,
                },
                pricRate: {
                    60: 0.00,
                    120: 3.80,
                    180: 5.80,
                    240: 7.90,
                    300: 10.00,
                }

            },
            payment: {
                method: "Bancontact", time: "2021-05-05T15:00:00.000Z", amount: 10.00, currency: "€"
            },
        },
        {
            car: "642-LQU",
            duration: {
                start: "2021-05-05T21:00:00Z",
                end: "2021-05-06T01:00:00Z"
            },
            price: 10.00,
            parking: {
                id: 1,
                type: "parking",
                currency: "€",
                priceRates: {
                    60: 0.00,
                    120: 3.80,
                    180: 5.80,
                    240: 7.90,
                    300: 10.00,
                },
                location: {
                    lng: 3.21878,
                    lat: 50.93014,
                },
                name: "Zottekot",
            },
            payment: {
                method: "Bancontact", time: "2021-05-05T15:00:00.000Z", amount: 10.00, currency: "€"
            },
        },
        {
            car: "681-DDR",
            duration: {
                start: "2021-05-05T03:00:00Z",
                end: "2021-05-05T05:00:00Z"
            },
            price: 5.00,
            parking: {
                id: 1,
                name: "Zottekot",
                location: {
                    lng: 3.21878,
                    lat: 50.93014,
                },
                prices: {
                    currency: "€",
                    price: [
                        { minutes: 60, price: 0.00 },
                        { minutes: 120, price: 3.80 },
                        { minutes: 180, price: 5.80 },
                        { minutes: 240, price: 7.90 },
                        { minutes: 300, price: 10.00 },
                        { minutes: 330, price: 10.00 },
                        { minutes: 360, price: 10.00 },
                        { minutes: 390, price: 10.00 }
                    ],
                },
            },
            payment: {
                method: "Bancontact", time: "2021-05-05T15:00:00.000Z", amount: 10.00, currency: "€"
            },
        },
        {
            car: "252-HVS",
            duration: {
                start: "2021-05-05T04:00:00Z",
                end: "2021-05-05T07:00:00Z"
            },
            price: 7.50,
            parking: {
                id: 1,
                name: "Zottekot",
                location: {
                    lng: 3.21878,
                    lat: 50.93014,
                },
                prices: {
                    currency: "€",
                    price: [
                        { minutes: 60, price: 0.00 },
                        { minutes: 120, price: 3.80 },
                        { minutes: 180, price: 5.80 },
                        { minutes: 240, price: 7.90 },
                        { minutes: 300, price: 10.00 },
                        { minutes: 330, price: 10.00 },
                        { minutes: 360, price: 10.00 },
                        { minutes: 390, price: 10.00 }
                    ],
                },
            },
            payment: {
                method: "Bancontact", time: "2021-05-05T15:00:00.000Z", amount: 10.00, currency: "€"
            },
        },
        {
            car: "549-FOD",
            duration: {
                start: "2021-05-05T21:00:00Z",
                end: "2021-05-05T23:00:00Z"
            },
            price: 5.00,
            parking: {
                id: 1,
                name: "Zottekot",
                location: {
                    lng: 3.21878,
                    lat: 50.93014,
                },
                prices: {
                    currency: "€",
                    price: [
                        { minutes: 60, price: 0.00 },
                        { minutes: 120, price: 3.80 },
                        { minutes: 180, price: 5.80 },
                        { minutes: 240, price: 7.90 },
                        { minutes: 300, price: 10.00 },
                        { minutes: 330, price: 10.00 },
                        { minutes: 360, price: 10.00 },
                        { minutes: 390, price: 10.00 }
                    ],
                },
            },
            payment: {
                method: "Bancontact", time: "2021-05-05T15:00:00.000Z", amount: 10.00, currency: "€"
            },
        }
    ]
}

export default { parkings, account }