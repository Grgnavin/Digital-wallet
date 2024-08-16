"use client"
import { useEffect, useState } from "react"
import axios from "axios";
import { Card } from "@repo/ui/card";

export function ShowTransactions() {
const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/showTransaction', { withCredentials: true });
                setData(res.data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    const OnRamp = data ? data.onRamp : [];
    const P2p = data ? data.p2p : [];
    console.log(P2p);
    
    return (
            <div className="flex justify-center items-center min-h-screen">
            <Card title="All the Transactions">
                <div className="pt-2">
                {OnRamp.map((x: any, index) => {
                    const date = new Date(x.startTime); // Define the date variable here
                    return (
                    <div key={index} className="flex justify-between mb-2">
                        <div>
                            <div className="text-sm">
                                Received NPR from {x.provider}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {date.toDateString()}
                            </div>
                        </div>
                            <div className="flex flex-col justify-center">
                                + Rs {x.amount / 100}
                            </div>
                    </div>
                    );
                })}
                {P2p.map((x: any, index) => {
                    const date = new Date(x.timestamp); // Define the date variable here
                    return (
                    <div key={index} className="flex justify-between mb-2">
                        <div>
                        <div className="text-sm">
                            Sent NPR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {date.toDateString()}
                        </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            - Rs {x.amount / 100}
                        </div>
                    </div>
                    );
                })}
                </div>
            </Card>
            </div>
        );
}