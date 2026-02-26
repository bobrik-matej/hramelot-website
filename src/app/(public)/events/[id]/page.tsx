import { db } from '@/lib/db';
import type { ClubEvent } from '@/types/events';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event: ClubEvent | null = await db.event.findUnique({
    where: { id, published: true },
    include: { _count: { select: { registrations: true } } },
  });

  if (!event) return notFound();

  return (
    <div className="container mx-auto space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
          {event.description && (
            <CardDescription className="mt-2 text-base">{event.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span>
                {format(new Date(event.startTime), 'PPp')} –{' '}
                {format(new Date(event.endTime), 'p')}
              </span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground h-4 w-4" />
                <span>
                  {event._count?.registrations ?? 0}/{event.capacity} spots taken
                </span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <Button size="lg" className="w-full md:w-auto">
            Register for Event
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
