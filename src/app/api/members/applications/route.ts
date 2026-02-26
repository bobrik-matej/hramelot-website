import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import {
  requireAuth,
  requireRole,
  successResponse,
  errorResponse,
  parsePagination,
} from '@/lib/api-helpers';
import { z } from 'zod';

const applySchema = z.object({
  message: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireAuth();
  if (error) return error;

  const existing = await db.memberApplication.findUnique({
    where: { userId: session!.user!.id! },
  });
  if (existing) return errorResponse('Application already submitted', 409);

  const body = await request.json().catch(() => ({}));
  const parsed = applySchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const application = await db.memberApplication.create({
    data: { userId: session!.user!.id!, ...parsed.data },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return successResponse(application, 201);
}

export async function GET(request: NextRequest) {
  const { error } = await requireRole('ADMIN');
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const { skip, limit } = parsePagination(searchParams);
  const status = searchParams.get('status') ?? undefined;

  const [applications, total] = await Promise.all([
    db.memberApplication.findMany({
      where: status ? { status: status as any } : {},
      include: { user: { select: { id: true, name: true, email: true, image: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    db.memberApplication.count({ where: status ? { status: status as any } : {} }),
  ]);

  return successResponse({ applications, total });
}
