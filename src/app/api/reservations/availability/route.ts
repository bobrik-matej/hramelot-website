import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get("tableId");
    const startTime = searchParams.get("startTime");
    const endTime = searchParams.get("endTime");

    if (!tableId || !startTime || !endTime) {
        return errorResponse("tableId, startTime, and endTime are required", 400);
    }

    const table = await db.table.findUnique({ where: { id: tableId } });
    if (!table) return errorResponse("Table not found", 404);

    const conflict = await db.reservation.findFirst({
        where: {
            tableId,
            startTime: { lt: new Date(endTime) },
            endTime: { gt: new Date(startTime) },
        },
    });

    return successResponse({ available: !conflict, conflict: conflict ?? null });
}
