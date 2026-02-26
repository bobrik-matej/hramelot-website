import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";

const roleSchema = z.object({
    role: z.enum(["PUBLIC", "USER", "MEMBER", "MASTER", "ADMIN"]),
});

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = roleSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return errorResponse("User not found", 404);

    const user = await db.user.update({
        where: { id },
        data: { role: parsed.data.role },
        select: { id: true, name: true, email: true, role: true },
    });

    return successResponse(user);
}
