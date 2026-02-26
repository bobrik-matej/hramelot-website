import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, errorResponse } from '@/lib/api-helpers';
import { z } from 'zod';

const borrowSchema = z.object({
  dueAt: z.coerce.date().optional(),
});

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireRole('MEMBER');
  if (error) return error;

  const game = await db.game.findUnique({ where: { id } });
  if (!game) return errorResponse('Game not found', 404);
  if (!game.available) return errorResponse('Game is not available for borrowing', 409);

  const body = await request.json().catch(() => ({}));
  const parsed = borrowSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const record = await db.$transaction(async (tx) => {
    await tx.game.update({ where: { id }, data: { available: false } });
    return tx.borrowRecord.create({
      data: {
        gameId: id,
        userId: session!.user!.id!,
        dueAt: parsed.data.dueAt ?? addDays(new Date(), 14),
      },
      include: { game: { select: { id: true, title: true } } },
    });
  });

  return successResponse(record, 201);
}
