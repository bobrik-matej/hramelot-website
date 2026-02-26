import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole, requireAuth, successResponse, errorResponse, parsePagination, parseSorting } from "@/lib/api-helpers";
import { z } from "zod";

const createReservationSchema = z.object({
    title: z.string().min(3),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    tableId: z.string().cuid(),
}).refine((d) => d.endTime > d.startTime, { message: "End time must be after start time", path: ["endTime"] });

export async function GET(request: NextRequest) {
    const { session, error } = await requireAuth();
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const { skip, limit } = parsePagination(searchParams);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const tableId = searchParams.get("tableId");

    const where: any = {
        ...(startDate ? { startTime: { gte: new Date(startDate) } } : {}),
        ...(endDate ? { endTime: { lte: new Date(endDate) } } : {}),
        ...(tableId ? { tableId } : {}),
    };

    const [reservations, total] = await Promise.all([
        db.reservation.findMany({
            where,
            include: {
                table: true,
                user: { select: { id: true, name: true, email: true } },
                gameSession: { select: { id: true, title: true, system: true } },
            },
            skip,
            take: limit,
            orderBy: { startTime: "desc" },
        }),
        db.reservation.count({ where }),
    ]);

    return successResponse({ reservations, total });
}

export async function POST(request: NextRequest) {
    const { session, error } = await requireRole("MEMBER");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = createReservationSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400, "VALIDATION_ERROR");

    const { title, startTime, endTime, tableId } = parsed.data;

    // Check for conflicts
    const conflict = await db.reservation.findFirst({
        where: {
            tableId,
            startTime: { lt: endTime },
            endTime: { gt: startTime },
        },
    });
    if (conflict) return errorResponse("Table is already reserved during this time", 409, "CONFLICT");

    const reservation = await db.reservation.create({
        data: { title, startTime, endTime, tableId, userId: session!.user!.id! },
        include: {
            table: true,
            user: { select: { id: true, name: true, email: true } },
        },
    });

    return successResponse(reservation, 201);
}
