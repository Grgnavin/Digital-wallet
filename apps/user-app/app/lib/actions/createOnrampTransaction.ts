"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (esewa/bank)
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return {
            message: "User not LoggedIn"
        }
    }
    const token__1 = Math.random().toString();
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(session?.user?.id),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token__1
        }
    })
    //const res = await axios.post('http:localhost:3003/webhook', { token__1, userId, amount })
    //if(!res.sucess){
    //return { message: "Error while tranfering the money" }
    //}
    return {
        message: "Done"
    }
}
