'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function MemberEventsPage() {
  // TODO: Fetch from API with user registration status
  const events = [
    {
      id: '1',
      title: 'D&D Beginner Night',
      date: '2026-03-15',
      registered: false,
      spotsLeft: 2,
    },
    {
      id: '2',
      title: 'MTG Draft Tournament',
      date: '2026-03-20',
      registered: true,
      spotsLeft: 0,
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Browse Events</h1>
        <p className="text-muted-foreground">Register for upcoming club events</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </div>
                {event.registered && <Badge>Registered</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {event.spotsLeft > 0 ? `${event.spotsLeft} spots left` : 'Full'}
                </span>
                <Link href={`/members/events/${event.id}/register`}>
                  <Button disabled={event.registered || event.spotsLeft === 0}>
                    {event.registered ? 'Already Registered' : 'Register'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
