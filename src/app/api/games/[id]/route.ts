import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, errorResponse } from '@/lib/api-helpers';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().max(5000).optional(),
  image: z.string().url().optional().or(z.literal('')),
  bggId: z.string().optional(),
  minPlayers: z.number().int().min(1).optional(),
  maxPlayers: z.number().int().min(1).optional(),
  available: z.boolean().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await db.game.findUnique({ where: { id } });
  if (!game) return errorResponse('Game not found', 404);
  return successResponse(game);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await requireRole('ADMIN');
  if (error) return error;

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const existing = await db.game.findUnique({ where: { id } });
  if (!existing) return errorResponse('Game not found', 404);

  const game = await db.game.update({ where: { id }, data: parsed.data });
  return successResponse(game);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await requireRole('ADMIN');
  if (error) return error;

  const existing = await db.game.findUnique({ where: { id } });
  if (!existing) return errorResponse('Game not found', 404);

  await db.game.delete({ where: { id } });
  return successResponse({ deleted: true });
}
