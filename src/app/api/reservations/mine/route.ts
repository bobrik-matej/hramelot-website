import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, successResponse, parsePagination } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
    const { session, error } = await requireAuth();
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const { skip, limit } = parsePagination(searchParams);

    const [reservations, total] = await Promise.all([
        db.reservation.findMany({
            where: { userId: session!.user!.id! },
            include: { table: true, gameSession: { select: { id: true, title: true } } },
            skip,
            take: limit,
            orderBy: { startTime: "desc" },
        }),
        db.reservation.count({ where: { userId: session!.user!.id! } }),
    ]);

    return successResponse({ reservations, total });
}
