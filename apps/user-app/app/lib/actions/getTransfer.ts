"use server"
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getTransfer() {
    const session = await getServerSession(authOptions);
    const result = await axios.get('/api/getTransfer', { withCredentials: true });
    if (!result) {
        return {
            message: "No recent Transactions"
        }
    }
    const userID = session?.user?.id;
    return {
        result,
        userID
    }
}