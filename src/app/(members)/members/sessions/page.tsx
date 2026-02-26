import { db } from '@/lib/db';
import type { GameSession } from '@/types/sessions';
import { SessionCard } from '@/components/sessions/SessionCard';

export default async function SessionsPage() {
  const sessions: GameSession[] = await db.gameSession.findMany({
    include: {
      organizer: { select: { id: true, name: true, image: true } },
      reservation: {
        select: {
          id: true,
          startTime: true,
          endTime: true,
          table: { select: { id: true, name: true } },
        },
      },
      _count: { select: { registrations: true } },
    },
    orderBy: { id: 'asc' },
  });

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Open Game Sessions</h1>
        <p className="text-muted-foreground">Join ongoing campaigns and one-shots</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
