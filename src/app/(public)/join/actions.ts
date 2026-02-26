'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function applyForMembershipAction() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/api/auth/signin?callbackUrl=/join');
  }

  const existing = await db.memberApplication.findUnique({
    where: { userId: session.user.id },
  });

  if (existing) {
    redirect('/members?applied=already');
  }

  await db.memberApplication.create({
    data: { userId: session.user.id },
  });

  redirect('/members?applied=true');
}
