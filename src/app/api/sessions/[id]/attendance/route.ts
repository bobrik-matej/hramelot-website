import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, roleAtLeast, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";
import type { UserRole } from "@prisma/client";

const attendanceSchema = z.object({
    attendees: z.array(z.string().cuid()),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireRole("MASTER");
    if (error) return error;

    const gameSession = await db.gameSession.findUnique({ where: { id } });
    if (!gameSession) return errorResponse("Session not found", 404);

    const userRole = (session!.user as any).role as UserRole ?? "USER";
    if (gameSession.organizerId !== session!.user!.id! && !roleAtLeast(userRole, "ADMIN")) {
        return errorResponse("Only the session organizer can mark attendance", 403);
    }

    const body = await request.json().catch(() => null);
    const parsed = attendanceSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    if (parsed.data.attendees.length === 0) {
        return errorResponse("Attendees list cannot be empty", 400);
    }

    // Mark listed players as CONFIRMED, others as CANCELLED
    await db.gameRegistration.updateMany({
        where: { gameSessionId: id, userId: { in: parsed.data.attendees } },
        data: { status: "CONFIRMED" },
    });
    await db.gameRegistration.updateMany({
        where: { gameSessionId: id, userId: { notIn: parsed.data.attendees } },
        data: { status: "CANCELLED" },
    });

    return successResponse({ marked: parsed.data.attendees.length });
}
