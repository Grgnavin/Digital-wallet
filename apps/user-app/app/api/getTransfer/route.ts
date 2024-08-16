import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({
            message: "Unauthorized request"
        }, { status: 403 })
    }
    try {
        const res = await prisma.p2pTransfer.findMany({
            where: {
                fromUserId: Number(session?.user?.id)
            },
            select: {
                amount: true,
                timestamp: true
            }
        }) 
        return Response.json({
            res,
            message: "Here are all the recent transations"
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Unauthorized request"
        }, { status: 403 });
    }
}