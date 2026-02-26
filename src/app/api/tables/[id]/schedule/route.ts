import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-helpers";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const table = await db.table.findUnique({ where: { id } });
    if (!table) return errorResponse("Table not found", 404);

    const reservations = await db.reservation.findMany({
        where: {
            tableId: id,
            ...(startDate || endDate ? {
                startTime: {
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {}),
                },
            } : {}),
        },
        include: {
            user: { select: { id: true, name: true } },
            gameSession: { select: { id: true, title: true, system: true } },
        },
        orderBy: { startTime: "asc" },
    });

    return successResponse({ table, reservations });
}
