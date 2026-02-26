import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, roleAtLeast, successResponse, errorResponse } from "@/lib/api-helpers";
import type { UserRole } from "@prisma/client";

export async function PUT(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireAuth();
    if (error) return error;

    const record = await db.borrowRecord.findUnique({ where: { id } });
    if (!record) return errorResponse("Borrow record not found", 404);

    const userRole = (session!.user as any).role as UserRole ?? "USER";
    if (record.userId !== session!.user!.id! && !roleAtLeast(userRole, "ADMIN")) {
        return errorResponse("Forbidden", 403);
    }

    if (record.status === "RETURNED") return errorResponse("Game already returned", 409);

    const updated = await db.$transaction(async (tx) => {
        await tx.game.update({ where: { id: record.gameId }, data: { available: true } });
        return tx.borrowRecord.update({
            where: { id },
            data: { status: "RETURNED", returnedAt: new Date() },
            include: { game: { select: { id: true, title: true } } },
        });
    });

    return successResponse(updated);
}
