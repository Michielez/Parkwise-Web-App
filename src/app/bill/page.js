import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Card from "../components/Card/Card"

import mockData from "@/app/mockData/mockData";

export default function Account({account = mockData.account}) {
    return (
        <>
            <main>
                <h1>Bill</h1>

                <Card title={"Recente transacties"}>
                    <ul>
                        {account.recentTransactions.map((transaction, index) => (
                            <li key={index}>
                                <p>{new Date(transaction.duration.start).toLocaleDateString()}</p>
                                <p>{transaction.car}</p>
                                <p>{transaction.payment.currency}{transaction.payment.amount.toFixed(2).replace('.', ',')}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </main>
            <BottomNavigation />
        </>
    );
}