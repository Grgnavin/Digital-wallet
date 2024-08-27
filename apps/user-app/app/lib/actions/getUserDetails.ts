"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function GetName() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            message: "User not loggedin"
        }
    }
    const id = Number(session?.user?.id);
    const userDetails = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!userDetails) {
        return {
            message: "User not found"
        }
    }
    return {
        userDetails
    }
}