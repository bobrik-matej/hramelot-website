import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, errorResponse } from '@/lib/api-helpers';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireRole('USER');
  if (error) return error;

  const gameSession = await db.gameSession.findUnique({ where: { id } });
  if (!gameSession) return errorResponse('Session not found', 404);

  const existing = await db.gameRegistration.findUnique({
    where: { gameSessionId_userId: { gameSessionId: id, userId: session!.user!.id! } },
  });
  if (existing) return errorResponse('Already joined or requested this session', 409);

  const registration = await db.gameRegistration.create({
    data: { gameSessionId: id, userId: session!.user!.id!, status: 'PENDING' },
    include: { gameSession: { select: { id: true, title: true } } },
  });
  return successResponse(registration, 201);
}
