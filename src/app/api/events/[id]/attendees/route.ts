import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, parsePagination } from '@/lib/api-helpers';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const { skip, limit } = parsePagination(searchParams);

  const event = await db.event.findUnique({ where: { id } });
  if (!event) return errorResponse('Event not found', 404);

  const [registrations, total] = await Promise.all([
    db.eventRegistration.findMany({
      where: { eventId: id },
      include: { user: { select: { id: true, name: true, image: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: 'asc' },
    }),
    db.eventRegistration.count({ where: { eventId: id } }),
  ]);

  return successResponse({ registrations, total });
}
