import type { Metadata } from 'next';
import { db } from '@/lib/db';
import type { ClubEvent } from '@/types/events';
import { EventCard } from '@/components/events/EventCard';

export const metadata: Metadata = {
  title: 'Upcoming Events | Hramelot Košice',
  description:
    'Browse and register for upcoming public gaming events at Hramelot in Košice. Board game nights, D&D sessions, tournaments, and more.',
};

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
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
