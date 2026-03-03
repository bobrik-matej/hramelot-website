import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import type { ClubEvent } from '@/types/events';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { EventRegisterButton } from '@/components/events/EventRegisterButton';

export default async function MemberEventsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const events: ClubEvent[] = await db.event.findMany({
    where: { published: true },
    include: {
      _count: { select: { registrations: true } },
      ...(userId
        ? { registrations: { where: { userId }, select: { id: true, status: true } } }
        : {}),
    },
    orderBy: { startTime: 'asc' },
  });

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Browse Events</h1>
        <p className="text-muted-foreground">Register for upcoming club events</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const spotsLeft = event.capacity
            ? event.capacity - (event._count?.registrations ?? 0)
            : Infinity;
          const isRegistered =
            Array.isArray(event.registrations) && event.registrations.length > 0;

          return (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(event.startTime), 'PPp')}
                    </CardDescription>
                  </div>
                  {isRegistered && <Badge>Registered</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    {event.capacity
                      ? spotsLeft > 0
                        ? `${spotsLeft} spots left`
                        : 'Full'
                      : 'Open'}
                  </span>
                  <EventRegisterButton
                    eventId={event.id}
                    isFull={spotsLeft === 0}
                    initialIsRegistered={isRegistered}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
