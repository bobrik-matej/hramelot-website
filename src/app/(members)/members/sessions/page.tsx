'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SessionsPage() {
  // TODO: Fetch from API
  const sessions = [
    {
      id: '1',
      title: 'Lost Mines of Phandelver',
      system: 'D&D 5e',
      dm: 'Gandalf',
      date: '2026-03-18',
      time: '18:00',
      openSpots: 2,
      totalSpots: 5,
    },
    {
      id: '2',
      title: 'Abomination Vaults',
      system: 'Pathfinder 2e',
      dm: 'Merlin',
      date: '2026-03-19',
      time: '19:00',
      openSpots: 1,
      totalSpots: 4,
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Open Game Sessions</h1>
        <p className="text-muted-foreground">Join ongoing campaigns and one-shots</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{session.title}</CardTitle>
                  <CardDescription>GM: {session.dm}</CardDescription>
                </div>
                <Badge variant="secondary">{session.system}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground text-sm">
                <p>
                  {session.date} at {session.time}
                </p>
                <p>
                  {session.openSpots}/{session.totalSpots} spots available
                </p>
              </div>
              <Button className="w-full" disabled={session.openSpots === 0}>
                {session.openSpots > 0 ? 'Request to Join' : 'Full'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
