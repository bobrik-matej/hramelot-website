import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, successResponse, errorResponse, parsePagination } from "@/lib/api-helpers";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireRole("MASTER");
    if (error) return error;

    const gameSession = await db.gameSession.findUnique({ where: { id } });
    if (!gameSession) return errorResponse("Session not found", 404);

    const { searchParams } = new URL(request.url);
    const { skip, limit } = parsePagination(searchParams);

    const [registrations, total] = await Promise.all([
        db.gameRegistration.findMany({
            where: { gameSessionId: id },
            include: { user: { select: { id: true, name: true, image: true, role: true } } },
            skip,
            take: limit,
        }),
        db.gameRegistration.count({ where: { gameSessionId: id } }),
    ]);

    return successResponse({ registrations, total });
}
