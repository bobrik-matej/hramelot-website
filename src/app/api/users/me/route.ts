import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";

const updateMeSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    image: z.string().url().optional().or(z.literal("")).optional(),
});

export async function GET() {
    const { session, error } = await requireAuth();
    if (error) return error;

    const user = await db.user.findUnique({
        where: { id: session!.user!.id! },
        select: {
            id: true, name: true, email: true, image: true, role: true,
            membershipStart: true, membershipEnd: true, membershipActive: true,
            sessionsHosted: true, masterSince: true, createdAt: true, updatedAt: true,
        },
    });

    if (!user) return errorResponse("User not found", 404);
    return successResponse(user);
}

export async function PUT(request: NextRequest) {
    const { session, error } = await requireAuth();
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = updateMeSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const user = await db.user.update({
        where: { id: session!.user!.id! },
        data: parsed.data,
        select: {
            id: true, name: true, email: true, image: true, role: true,
            membershipStart: true, membershipEnd: true, membershipActive: true,
            createdAt: true, updatedAt: true,
        },
    });

    return successResponse(user);
}
