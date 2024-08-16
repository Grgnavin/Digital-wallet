import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({
            message: "Unauthorized Request",
            success: false
        }, { status: 403 })
    }

    try {
        const onRamp = await prisma.onRampTransaction.findMany({
            where: {
                userId: Number(session.user?.id)
            }
        })
        if (!onRamp || !onRamp.length ) {
            return Response.json({
                message: "No Trasactions yet"
            }, { status: 403 });
        }

        const p2p = await prisma.p2pTransfer.findMany({
            where: {
                fromUserId: Number(session.user?.id)
            }
        })

        if (!p2p || !p2p.length ) {
            return Response.json({
                message: "No Trasactions yet"
            }, { status: 403 });
        }

        return Response.json({
            data: { onRamp, p2p },
            message: "Here are all the user Transactions",
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Internal server error"
        }, { status: 500 });
    }



}