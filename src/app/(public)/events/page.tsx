import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  // Placeholder data - replace with DB fetch
  const events = [
    {
      id: '1',
      title: 'D&D Beginner Night',
      description: 'Learn the basics of D&D in a welcoming environment',
      date: '2026-03-15',
      time: '18:00',
      slots: 6,
      registered: 4,
      type: 'workshop',
    },
    {
      id: '2',
      title: 'Magic: The Gathering Draft Tournament',
      description: 'Competitive draft tournament with prizes',
      date: '2026-03-20',
      time: '14:00',
      slots: 16,
      registered: 12,
      type: 'tournament',
    },
  ];

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
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </div>
                <Badge>{event.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.registered}/{event.slots} registered
                  </span>
                </div>
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
