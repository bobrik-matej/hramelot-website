import { db } from '@/lib/db';
import type { ClubEvent } from '@/types/events';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function EventsPage() {
  const events: ClubEvent[] = await db.event.findMany({
    where: { published: true },
    include: { _count: { select: { registrations: true } } },
    orderBy: { startTime: 'asc' },
  });

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <p className="text-muted-foreground">Join our public gaming events</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              {event.description && (
                <CardDescription className="mt-2">{event.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.startTime), 'MMM d, yyyy · HH:mm')}</span>
                </div>
                {event.capacity && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {event._count?.registrations ?? 0}/{event.capacity} registered
                    </span>
                  </div>
                )}
              </div>
              <Link href={`/events/${event.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
