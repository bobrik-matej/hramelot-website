import type { GameSession } from '@/types/sessions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface SessionCardProps {
  session: GameSession;
}

export function SessionCard({ session }: SessionCardProps) {
  const openSpots = session.maxPlayers - (session._count?.registrations ?? 0);

  return (
    <Card>
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
}
