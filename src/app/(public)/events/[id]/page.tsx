import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Placeholder - replace with actual DB query
  const event = {
    id,
    title: 'D&D Beginner Night',
    description: 'Learn the basics of D&D in a welcoming environment. No experience needed!',
    longDescription:
      "Join us for an evening dedicated to new players. We'll cover character creation, basic rules, and run a short adventure. All materials provided.",
    date: '2026-03-15',
    time: '18:00',
    duration: '3 hours',
    slots: 6,
    registered: 4,
    type: 'workshop',
    table: 'Main Hall',
    requirements: 'None - beginners welcome',
  };

  if (!event) return notFound();

  return (
    <div className="container mx-auto space-y-6 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl">{event.title}</CardTitle>
              <CardDescription className="mt-2 text-base">{event.description}</CardDescription>
            </div>
            <Badge>{event.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span>
                {event.date} at {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <span>
                {event.registered}/{event.slots} spots taken
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <span>{event.table}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">About This Event</h3>
            <p className="text-muted-foreground">{event.longDescription}</p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Requirements</h3>
            <p className="text-muted-foreground">{event.requirements}</p>
          </div>

          <Button size="lg" className="w-full md:w-auto">
            Register for Event
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
