import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth, roleAtLeast, successResponse, errorResponse } from '@/lib/api-helpers';
import { z } from 'zod';
import type { UserRole } from '@prisma/client';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
  tableId: z.string().cuid().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await requireAuth();
  if (error) return error;

  const reservation = await db.reservation.findUnique({
    where: { id },
    include: {
      table: true,
      user: { select: { id: true, name: true, email: true } },
      gameSession: true,
    },
  });
  if (!reservation) return errorResponse('Reservation not found', 404);
  return successResponse(reservation);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireAuth();
  if (error) return error;

  const reservation = await db.reservation.findUnique({ where: { id } });
  if (!reservation) return errorResponse('Reservation not found', 404);

  const userRole = ((session!.user as any).role as UserRole) ?? 'USER';
  if (reservation.userId !== session!.user!.id! && !roleAtLeast(userRole, 'ADMIN')) {
    return errorResponse('Forbidden', 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const updated = await db.reservation.update({
    where: { id },
    data: parsed.data,
    include: { table: true, user: { select: { id: true, name: true, email: true } } },
  });
  return successResponse(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireAuth();
  if (error) return error;

  const reservation = await db.reservation.findUnique({ where: { id } });
  if (!reservation) return errorResponse('Reservation not found', 404);

  const userRole = ((session!.user as any).role as UserRole) ?? 'USER';
  if (reservation.userId !== session!.user!.id! && !roleAtLeast(userRole, 'ADMIN')) {
    return errorResponse('Forbidden', 403);
  }

  await db.reservation.delete({ where: { id } });
  return successResponse({ deleted: true });
}
