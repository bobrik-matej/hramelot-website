import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { ClubEvent } from '@/types/events';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { EventRegisterButton } from '@/components/events/EventRegisterButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await db.event.findUnique({ where: { id, published: true } });
  if (!event) return {};
  return {
    title: `${event.title} | Hramelot Events`,
    description: event.description ?? `Join us for ${event.title} at Hramelot Košice.`,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [event, session] = await Promise.all([
    db.event.findUnique({
      where: { id, published: true },
      include: { _count: { select: { registrations: true } } },
    }) as Promise<ClubEvent | null>,
    auth(),
  ]);

  if (!event) return notFound();

  const userId = session?.user?.id;
  const registrationCount = event._count?.registrations ?? 0;
  const isFull = event.capacity != null && registrationCount >= event.capacity;

  let isRegistered = false;
  if (userId) {
    const existing = await db.eventRegistration.findUnique({
      where: { eventId_userId: { eventId: id, userId } },
    });
    isRegistered = !!existing;
  }

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

          <EventRegisterButton eventId={event.id} isFull={isFull} initialIsRegistered={isRegistered} />
        </CardContent>
      </Card>
    </div>
  );
}
