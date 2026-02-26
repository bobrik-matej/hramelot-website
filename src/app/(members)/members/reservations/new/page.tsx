import { db } from '@/lib/db';
import type { Table } from '@/types/reservations';
import NewReservationForm from '@/components/reservations/NewReservationForm';

export default async function NewReservationPage() {
  const tables: Table[] = await db.table.findMany({ orderBy: { name: 'asc' } });

  return <NewReservationForm tables={tables} />;
}
