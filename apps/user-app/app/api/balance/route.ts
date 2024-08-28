import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({
            message: "User not loggedIn"
        }, { status: 403 })
    }

    const blc = await prisma.balance.findFirst({
        where: {
            userId: Number(session.user?.id)
        }
    })

    if (!blc) {
        return NextResponse.json({
            message: "Balance not found"
        }, { status: 401 });
    }

    return NextResponse.json({
        blc
    })
}