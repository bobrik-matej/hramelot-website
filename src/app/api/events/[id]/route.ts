import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, successResponse, errorResponse } from "@/lib/api-helpers";
import { z } from "zod";

const updateEventSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().max(5000).optional(),
    location: z.string().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    capacity: z.number().int().positive().nullable().optional(),
    image: z.string().url().optional().or(z.literal("")),
    published: z.boolean().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await db.event.findUnique({
        where: { id },
        include: { _count: { select: { registrations: true } } },
    });
    if (!event || !event.published) return errorResponse("Event not found", 404);
    return successResponse(event);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = updateEventSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const existing = await db.event.findUnique({ where: { id } });
    if (!existing) return errorResponse("Event not found", 404);

    const event = await db.event.update({
        where: { id },
        data: parsed.data,
        include: { _count: { select: { registrations: true } } },
    });
    return successResponse(event);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const existing = await db.event.findUnique({ where: { id } });
    if (!existing) return errorResponse("Event not found", 404);

    await db.event.delete({ where: { id } });
    return successResponse({ deleted: true });
}
