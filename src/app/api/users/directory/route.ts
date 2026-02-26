import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, parsePagination } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  const { error } = await requireRole('MEMBER');
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const { skip, limit } = parsePagination(searchParams);

  const [users, total] = await Promise.all([
    db.user.findMany({
      where: { membershipActive: true },
      select: {
        id: true,
        name: true,
        image: true,
        role: true,
        membershipActive: true,
        sessionsHosted: true,
        masterSince: true,
      },
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    }),
    db.user.count({ where: { membershipActive: true } }),
  ]);

  return successResponse({ users, total });
}
