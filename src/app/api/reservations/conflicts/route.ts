import {NextRequest} from 'next/server';
import {db} from '@/lib/db';
import {requireRole, successResponse} from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  const { error } = await requireRole('ADMIN');
  if (error) return error;

  // Find overlapping reservations for the same table
  const reservations = await db.reservation.findMany({
    include: { table: true, user: { select: { id: true, name: true, email: true } } },
    orderBy: [{ tableId: 'asc' }, { startTime: 'asc' }],
  });

  const conflicts: { a: (typeof reservations)[0]; b: (typeof reservations)[0] }[] = [];
  for (let i = 0; i < reservations.length; i++) {
    for (let j = i + 1; j < reservations.length; j++) {
      const a = reservations[i];
      const b = reservations[j];
      if (a.tableId !== b.tableId) continue;
      if (a.startTime < b.endTime && a.endTime > b.startTime) {
        conflicts.push({ a, b });
      }
    }
  }

  return successResponse(conflicts);
}
