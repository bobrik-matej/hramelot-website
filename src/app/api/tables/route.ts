import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, errorResponse } from '@/lib/api-helpers';
import { z } from 'zod';

const tableSchema = z.object({
  name: z.string().min(2),
  capacity: z.number().int().positive().default(6),
});

export async function GET() {
  const tables = await db.table.findMany({ orderBy: { name: 'asc' } });
  return successResponse(tables);
}

export async function POST(request: NextRequest) {
  const { error } = await requireRole('ADMIN');
  if (error) return error;

  const body = await request.json().catch(() => null);
  const parsed = tableSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const table = await db.table.create({ data: parsed.data });
  return successResponse(table, 201);
}
