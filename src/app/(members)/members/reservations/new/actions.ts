'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { reservationSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export type ReservationActionState = { error: string } | null;

export async function createReservationAction(
  _prev: ReservationActionState,
  formData: FormData,
): Promise<ReservationActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'You must be logged in to make a reservation.' };
  }

  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const duration = parseFloat(formData.get('duration') as string);

  if (!date || !time || isNaN(duration)) {
    return { error: 'Please fill in all required fields.' };
  }

  const startTime = new Date(`${date}T${time}`);
  const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

  const parsed = reservationSchema.safeParse({
    title: formData.get('title'),
    tableId: formData.get('tableId'),
    userId: session.user.id,
    startTime,
    endTime,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(', ') };
  }

  await db.reservation.create({ data: parsed.data });

  redirect('/members/reservations');
}
