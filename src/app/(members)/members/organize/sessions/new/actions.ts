'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { gameSessionSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export type SessionActionState = { error: string } | null;

export async function createSessionAction(
  _prev: SessionActionState,
  formData: FormData,
): Promise<SessionActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'You must be logged in to create a session.' };
  }

  const role = session.user.role as string;
  if (role !== 'MASTER' && role !== 'ADMIN') {
    return { error: 'Only Game Masters can create sessions.' };
  }

  const parsed = gameSessionSchema.safeParse({
    title: formData.get('title'),
    system: formData.get('system'),
    description: formData.get('description') || undefined,
    minPlayers: parseInt(formData.get('minPlayers') as string) || 3,
    maxPlayers: parseInt(formData.get('maxPlayers') as string) || 5,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(', ') };
  }

  await db.gameSession.create({
    data: { ...parsed.data, organizerId: session.user.id },
  });

  redirect('/members/sessions');
}
