import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, roleAtLeast, successResponse, errorResponse } from '@/lib/api-helpers';
import { z } from 'zod';
import type { UserRole } from '@prisma/client';

const updateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'WAITLIST', 'CANCELLED']),
  note: z.string().max(500).optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> },
) {
  const { id, userId } = await params;
  const { session, error } = await requireRole('MASTER');
  if (error) return error;

  const gameSession = await db.gameSession.findUnique({ where: { id } });
  if (!gameSession) return errorResponse('Session not found', 404);

  const userRole = ((session!.user as any).role as UserRole) ?? 'USER';
  if (gameSession.organizerId !== session!.user!.id! && !roleAtLeast(userRole, 'ADMIN')) {
    return errorResponse('Only the session organizer can manage players', 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const registration = await db.gameRegistration.findUnique({
    where: { gameSessionId_userId: { gameSessionId: id, userId } },
  });
  if (!registration) return errorResponse('Player registration not found', 404);

  const updated = await db.gameRegistration.update({
    where: { gameSessionId_userId: { gameSessionId: id, userId } },
    data: parsed.data,
    include: { user: { select: { id: true, name: true } } },
  });
  return successResponse(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> },
) {
  const { id, userId } = await params;
  const { session, error } = await requireRole('MASTER');
  if (error) return error;

  const gameSession = await db.gameSession.findUnique({ where: { id } });
  if (!gameSession) return errorResponse('Session not found', 404);

  const userRole = ((session!.user as any).role as UserRole) ?? 'USER';
  if (gameSession.organizerId !== session!.user!.id! && !roleAtLeast(userRole, 'ADMIN')) {
    return errorResponse('Only the session organizer can manage players', 403);
  }

  const registration = await db.gameRegistration.findUnique({
    where: { gameSessionId_userId: { gameSessionId: id, userId } },
  });
  if (!registration) return errorResponse('Player registration not found', 404);

  await db.gameRegistration.delete({
    where: { gameSessionId_userId: { gameSessionId: id, userId } },
  });
  return successResponse({ deleted: true });
}
