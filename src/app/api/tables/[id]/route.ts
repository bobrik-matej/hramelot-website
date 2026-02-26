import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";

const updateSchema = z.object({
    name: z.string().min(2).optional(),
    capacity: z.number().int().positive().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const table = await db.table.findUnique({ where: { id } });
    if (!table) return errorResponse("Table not found", 404);
    return successResponse(table);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const existing = await db.table.findUnique({ where: { id } });
    if (!existing) return errorResponse("Table not found", 404);

    const table = await db.table.update({ where: { id }, data: parsed.data });
    return successResponse(table);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const existing = await db.table.findUnique({ where: { id } });
    if (!existing) return errorResponse("Table not found", 404);

    await db.table.delete({ where: { id } });
    return successResponse({ deleted: true });
}
