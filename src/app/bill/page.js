"use client";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Card from "../components/Card/Card"

import {useEffect, useState} from "react";
import mockData from "@/app/mockData/mockData";
import { refactorData, recentTransactionsStrategy } from "@/app/api/apiStrategies";
import ParkwiseAPI from "@/app/api/parkwise-strapi-api";
import useAuth from "../hooks/useAuth";


export default function Bill({}) {

    const [recentTransactions, setRecentTransactions] = useState([]);
    const { loggedIn, updateLoggedIn, getCookie } = useAuth();

    const authToken = getCookie("authToken");
    const parkwiseAPI = new ParkwiseAPI(authToken);

    useEffect(()=>{
        const fetchRecentTransactions = async () => {
            const data = await parkwiseAPI.getRecentTransactions();
            const recentTransactions = refactorData(data.data, recentTransactionsStrategy);
            setRecentTransactions(recentTransactions);
        }
        if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi" && loggedIn) {
            fetchRecentTransactions();
        } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock" && loggedIn) {
            setRecentTransactions(mockData.account.recentTransactions);
        }
    }, [loggedIn]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    const isRecentTransactionsFetched = () => recentTransactions.length > 0;
    
    return (
        <>
            <main>
                <h1>Bill</h1>
                {loggedIn && isRecentTransactionsFetched && <Card title={"Recente transacties"}>
                    <ul>
                        {recentTransactions.map((transaction, index) => (
                            <li key={index}>
                                <p>{formatDate(transaction.duration.start)}</p>
                                <p>{transaction.parking.name}</p>
                                <p>{transaction.payment.currency.symbol}{transaction.payment.amount.toFixed(2).replace('.', ',')}</p>
                            </li>
                        ))}
                    </ul>
                </Card>}
                {!loggedIn && <p>You're currently not logged in!</p>}
                {loggedIn && !isRecentTransactionsFetched && <p>Loading...</p>}
                
            </main>
            <BottomNavigation />
        </>
    );
}