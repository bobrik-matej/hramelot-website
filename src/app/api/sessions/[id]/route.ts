import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, roleAtLeast, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";
import type { UserRole } from "@prisma/client";

const updateSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().max(5000).optional(),
    system: z.string().min(1).optional(),
    image: z.string().url().optional().or(z.literal("")),
    minPlayers: z.number().int().min(1).optional(),
    maxPlayers: z.number().int().min(1).optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gameSession = await db.gameSession.findUnique({
        where: { id },
        include: {
            organizer: { select: { id: true, name: true, image: true } },
            reservation: { select: { id: true, startTime: true, endTime: true, table: true } },
            _count: { select: { registrations: true } },
        },
    });
    if (!gameSession) return errorResponse("Session not found", 404);
    return successResponse(gameSession);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireRole("MASTER");
    if (error) return error;

    const gameSession = await db.gameSession.findUnique({ where: { id } });
    if (!gameSession) return errorResponse("Session not found", 404);

    const userRole = (session!.user as any).role as UserRole ?? "USER";
    if (gameSession.organizerId !== session!.user!.id! && !roleAtLeast(userRole, "ADMIN")) {
        return errorResponse("Forbidden", 403);
    }

    const body = await request.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const updated = await db.gameSession.update({ where: { id }, data: parsed.data });
    return successResponse(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireRole("MASTER");
    if (error) return error;

    const gameSession = await db.gameSession.findUnique({ where: { id } });
    if (!gameSession) return errorResponse("Session not found", 404);

    const userRole = (session!.user as any).role as UserRole ?? "USER";
    if (gameSession.organizerId !== session!.user!.id! && !roleAtLeast(userRole, "ADMIN")) {
        return errorResponse("Forbidden", 403);
    }

    await db.gameSession.delete({ where: { id } });
    return successResponse({ deleted: true });
}
