import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) return errorResponse("startDate and endDate are required", 400);

    const reservations = await db.reservation.findMany({
        where: {
            startTime: { gte: new Date(startDate) },
            endTime: { lte: new Date(endDate) },
        },
        include: {
            table: { select: { id: true, name: true } },
            gameSession: { select: { id: true, title: true, system: true } },
        },
        orderBy: { startTime: "asc" },
    });

    return successResponse(reservations);
}
