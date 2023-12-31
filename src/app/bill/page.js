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
            console.log(data);
            const recentTransactions = refactorData(data.data, recentTransactionsStrategy);
            console.log(recentTransactions);
            setRecentTransactions(recentTransactions);
        }
        if (process.env.NEXT_PUBLIC_API_CHOICE === "strapi") {
            fetchRecentTransactions();
        } else if (process.env.NEXT_PUBLIC_API_CHOICE === "mock") {
            setRecentTransactions(mockData.account.recentTransactions);
        }
    }, []);

    return (
        <>
            <main>
                <h1>Bill</h1>

                <Card title={"Recente transacties"}>
                    <ul>
                        {recentTransactions.map((transaction, index) => (
                            <li key={index}>
                                <p>{new Date(transaction.duration.start).toLocaleDateString()}</p>
                                <p>{transaction.car}</p>
                                <p>{transaction.payment.currency.symbol}{transaction.payment.amount.toFixed(2).replace('.', ',')}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </main>
            <BottomNavigation />
        </>
    );
}