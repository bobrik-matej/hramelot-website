import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireRole, successResponse, errorResponse, parsePagination } from "@/lib/api-helpers";
import { z } from "zod";

const createGameSchema = z.object({
    title: z.string().min(1),
    description: z.string().max(5000).optional(),
    image: z.string().url().optional().or(z.literal("")),
    bggId: z.string().optional(),
    minPlayers: z.number().int().min(1).default(2),
    maxPlayers: z.number().int().min(1).default(4),
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const { skip, limit } = parsePagination(searchParams);
    const available = searchParams.get("available");
    const search = searchParams.get("q");

    const where: any = {
        ...(available === "true" ? { available: true } : {}),
        ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    };

    const [games, total] = await Promise.all([
        db.game.findMany({
            where,
            skip,
            take: limit,
            orderBy: { title: "asc" },
        }),
        db.game.count({ where }),
    ]);

    return successResponse({ games, total });
}

export async function POST(request: NextRequest) {
    const { error } = await requireRole("ADMIN");
    if (error) return error;

    const body = await request.json().catch(() => null);
    const parsed = createGameSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);

    const game = await db.game.create({ data: parsed.data });
    return successResponse(game, 201);
}
