import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth, successResponse, parsePagination } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  const { session, error } = await requireAuth();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const { skip, limit } = parsePagination(searchParams);

  const [records, total] = await Promise.all([
    db.borrowRecord.findMany({
      where: { userId: session!.user!.id!, status: { in: ['BORROWED', 'OVERDUE'] } },
      include: { game: { select: { id: true, title: true, image: true } } },
      skip,
      take: limit,
      orderBy: { borrowedAt: 'desc' },
    }),
    db.borrowRecord.count({
      where: { userId: session!.user!.id!, status: { in: ['BORROWED', 'OVERDUE'] } },
    }),
  ]);

  return successResponse({ records, total });
}
