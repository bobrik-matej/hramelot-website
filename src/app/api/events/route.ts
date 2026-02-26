import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, successResponse, errorResponse, parsePagination } from "@/lib/api-helpers";
import { z } from "zod";

const createEventSchema = z.object({
    title: z.string().min(3),
    description: z.string().max(5000).optional(),
    location: z.string().optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    capacity: z.number().int().positive().optional(),
    image: z.string().url().optional().or(z.literal("")),
    published: z.boolean().default(true),
}).refine((d) => d.endTime > d.startTime, { message: "End time must be after start time", path: ["endTime"] });

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const { skip, limit } = parsePagination(searchParams);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {
        published: true,
        ...(startDate ? { startTime: { gte: new Date(startDate) } } : {}),
        ...(endDate ? { endTime: { lte: new Date(endDate) } } : {}),
    };

    const [events, total] = await Promise.all([
        db.event.findMany({
            where,
            include: { _count: { select: { registrations: true } } },
            skip,
            take: limit,
            orderBy: { startTime: "asc" },
        }),
        db.event.count({ where }),
    ]);

    return successResponse({ events, total });
}

export async function POST(request: NextRequest) {
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = createEventSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const event = await db.event.create({
        data: parsed.data,
        include: { _count: { select: { registrations: true } } },
    });
    return successResponse(event, 201);
}
