import { db } from '@/lib/db';
import type { GameSession } from '@/types/sessions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

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
        {sessions.map((session) => {
          const openSpots = session.maxPlayers - (session._count?.registrations ?? 0);
          return (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{session.title}</CardTitle>
                    <CardDescription>GM: {session.organizer?.name ?? '—'}</CardDescription>
                  </div>
                  <Badge variant="secondary">{session.system}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-muted-foreground text-sm">
                  {session.reservation ? (
                    <p>{format(new Date(session.reservation.startTime), 'PPp')}</p>
                  ) : (
                    <p>Date TBD</p>
                  )}
                  <p>
                    {openSpots}/{session.maxPlayers} spots available
                  </p>
                </div>
                <Button className="w-full" disabled={openSpots === 0}>
                  {openSpots > 0 ? 'Request to Join' : 'Full'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
