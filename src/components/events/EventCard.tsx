import type { ClubEvent } from '@/types/events';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface EventCardProps {
  event: ClubEvent & { _count?: { registrations: number } };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
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
  );
}
