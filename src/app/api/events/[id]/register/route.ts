import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, requireAuth, successResponse, errorResponse } from '@/lib/api-helpers';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireRole('USER');
  if (error) return error;

  const event = await db.event.findUnique({ where: { id, published: true } });
  if (!event) return errorResponse('Event not found', 404);

  // Check capacity
  if (event.capacity !== null) {
    const count = await db.eventRegistration.count({ where: { eventId: id } });
    if (count >= event.capacity) return errorResponse('Event is at full capacity', 409);
  }

  const existing = await db.eventRegistration.findUnique({
    where: { eventId_userId: { eventId: id, userId: session!.user!.id! } },
  });
  if (existing) return errorResponse('Already registered for this event', 409);

  const registration = await db.eventRegistration.create({
    data: { eventId: id, userId: session!.user!.id! },
    include: { event: { select: { id: true, title: true } } },
  });
  return successResponse(registration, 201);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireAuth();
  if (error) return error;

  const registration = await db.eventRegistration.findUnique({
    where: { eventId_userId: { eventId: id, userId: session!.user!.id! } },
  });
  if (!registration) return errorResponse('Registration not found', 404);

  await db.eventRegistration.delete({
    where: { eventId_userId: { eventId: id, userId: session!.user!.id! } },
  });
  return successResponse({ deleted: true });
}
