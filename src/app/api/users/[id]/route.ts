import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, requireRole, roleAtLeast, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";
import type { UserRole } from "@prisma/client";

const updateUserSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    image: z.string().url().optional().or(z.literal("")).optional(),
    membershipActive: z.boolean().optional(),
    membershipStart: z.coerce.date().optional(),
    membershipEnd: z.coerce.date().optional(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireRole("MEMBER");
    if (error) return error;

    const user = await db.user.findUnique({
        where: { id },
        select: {
            id: true, name: true, email: true, image: true, role: true,
            membershipActive: true, sessionsHosted: true, masterSince: true,
            createdAt: true,
        },
    });

    if (!user) return errorResponse("User not found", 404);
    return successResponse(user);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { session, error } = await requireRole("ADMIN");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return errorResponse("User not found", 404);

    const user = await db.user.update({
        where: { id },
        data: parsed.data,
        select: {
            id: true, name: true, email: true, image: true, role: true,
            membershipActive: true, createdAt: true, updatedAt: true,
        },
    });

    return successResponse(user);
}
