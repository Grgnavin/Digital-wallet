"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useEffect, useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { TransferHistory } from "./TransferHistory";
import axios from "axios";

type Transfer = {
    amount: number;
    timestamp: string; // Assuming timestamp is a string from the API
};

export function SendCard() {
    const [number, setNumber] = useState("");
    const [data, setData] = useState([]);
    const [amount, setAmount] = useState("");
    const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

    useEffect(() => {
        const getTransfer = async() => {
            try {
                const res = await axios.get('/api/getTransfer', { withCredentials: true });
                const resData = Array.isArray(res.data?.res) ? res.data?.res : [];
                const formattedData: any = resData.map((x: Transfer) => ({
                    amount: x.amount,
                    time: x.timestamp,
                }));
                setData(formattedData)
            } catch (error) {
                console.error(error);
            }
        }
        getTransfer();
    }, [refresh])

    const handleSend = async () => {
        try {
            await p2pTransfer(number, Number(amount) * 100);
            setRefresh(prev => !prev); 
            setAmount("");
        } catch (error) {
            console.error('Error sending transfer:', error);
        }
    };

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={handleSend}>Send</Button>
                    </div>
                </div>
            </Card>
            <div>
                <TransferHistory transfer={data}/>
            </div>
        </Center>
    </div>
}