"use client";
import { Card } from '@repo/ui/card'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DashBoard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [txns, setTxns] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function GetUser() {
            try {
                const res =await axios.get('/api/user', {
                    withCredentials: true
                })
                setUser(res?.data?.user);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/showTransaction', { withCredentials: true });
                setTxns(res.data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        GetUser();
    }, [balance])
    
    useEffect(() => {
        async function GetBalance() {
            try {
                const res =await axios.get('/api/balance', {
                    withCredentials: true
                })
                setBalance(res.data?.blc);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        GetBalance();
         // Call GetBalance when transactions change
        if (txns.length > 0) {
            GetBalance();
        }
    }, [txns]);

    const username = user?.name || "User";

    const TransferMoney = () => {
        router.push('/transfer');
    }   

    const SeeTransactions = () => {
        router.push('/transactions');
    }

    const LoadMoney = () => {
        router.push('/p2p');
    }
    const onRamp = txns ? txns.onRamp : [];
    
    return (
        <div className="w-full p-4">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold text-center">
                WELCOME TO THE DIGITAL WALLET
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* Left Section - Account Balance and User Greeting */}
                <div className="col-span-2">
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <Card title={`Good Morning, ${username}`}>
                                <div className="text-2xl font-semibold pt-2">
                                    {`Your Balance: NPR ${balance.amount / 100}`}
                                </div>
                                <div className="pt-4">
                                    {/* Quick Actions */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <button className="bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700"
                                        onClick={TransferMoney}
                                        >
                                            Load Money
                                        </button>
                                        <button className="bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700"
                                        onClick={SeeTransactions}
                                        >
                                            See Transactions
                                        </button>
                                        <button className="bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700"
                                        onClick={LoadMoney}
                                        >
                                            Send Money
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Right Section - Offers and Ads */}
                <div className="col-span-1">
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <Card title="Exclusive Offers">
                                <div className="space-y-4 pt-2">
                                    <div className="bg-yellow-300 p-4 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">10% Cashback on Transfers!</h3>
                                        <p className="text-sm">Use code <strong>WALLET10</strong> on your next transfer.</p>
                                    </div>
                                    <div className="bg-pink-300 p-4 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">Special Savings Offer</h3>
                                        <p className="text-sm">Save more with our new saving plans. <a href="#" className="text-blue-700 underline">Learn more</a></p>
                                    </div>
                                    <div className="bg-blue-300 p-4 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">Refer a Friend</h3>
                                        <p className="text-sm">Earn NPR 500 for every friend you refer who signs up.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section - Recent Transactions */}
            <div className="mt-8">
            <Card title="Recent Transactions">
                    <div className="text-lg font-medium">
                        {/* Display recent transactions */}
                        {onRamp ? (
                            <ul className="space-y-2">
                                {onRamp.map((txn) => (
                                    <li key={txn.id} className="flex justify-between">
                                        <span>{`Received from ${txn.provider}`}</span>
                                        <span className={txn.amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                                            {txn.amount >= 0 ? `+ NPR ${txn.amount / 100}` : `- NPR ${Math.abs(txn.amount)}`}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recent transactions available.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashBoard