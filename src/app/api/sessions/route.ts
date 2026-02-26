import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, errorResponse, parsePagination } from '@/lib/api-helpers';
import { z } from 'zod';

const createSessionSchema = z
  .object({
    title: z.string().min(3),
    description: z.string().max(5000).optional(),
    system: z.string().min(1),
    image: z.string().url().optional().or(z.literal('')),
    minPlayers: z.number().int().min(1).default(3),
    maxPlayers: z.number().int().min(1).default(5),
    reservationId: z.string().cuid().optional(),
  })
  .refine((d) => d.maxPlayers >= d.minPlayers, {
    message: 'maxPlayers must be >= minPlayers',
    path: ['maxPlayers'],
  });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { skip, limit } = parsePagination(searchParams);
  const system = searchParams.get('system');

  const where: any = {
    ...(system ? { system: { contains: system, mode: 'insensitive' } } : {}),
  };

  const [sessions, total] = await Promise.all([
    db.gameSession.findMany({
      where,
      include: {
        organizer: { select: { id: true, name: true, image: true } },
        reservation: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            table: { select: { id: true, name: true } },
          },
        },
        _count: { select: { registrations: true } },
      },
      skip,
      take: limit,
      orderBy: { id: 'asc' },
    }),
    db.gameSession.count({ where }),
  ]);

  return successResponse({ sessions, total });
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireRole('MASTER');
  if (error) return error;

  const body = await request.json().catch(() => null);
  const parsed = createSessionSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const { reservationId, ...rest } = parsed.data;

  if (reservationId) {
    const reservation = await db.reservation.findUnique({ where: { id: reservationId } });
    if (!reservation) return errorResponse('Reservation not found', 404);
    const linked = await db.gameSession.findUnique({ where: { reservationId } });
    if (linked) return errorResponse('Reservation already has a session', 409);
  }

  const gameSession = await db.gameSession.create({
    data: { ...rest, organizerId: session!.user!.id!, ...(reservationId ? { reservationId } : {}) },
    include: {
      organizer: { select: { id: true, name: true } },
      reservation: { select: { id: true, startTime: true, endTime: true } },
    },
  });

  return successResponse(gameSession, 201);
}
