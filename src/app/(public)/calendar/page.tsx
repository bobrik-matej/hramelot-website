import { db } from '@/lib/db';
import CalendarView, { type CalendarItem } from '@/components/calendar/CalendarView';
import type { ClubEvent } from '@/types/events';
import type { GameSession } from '@/types/sessions';

type EventWithCount = ClubEvent & { _count: { registrations: number } };
type SessionWithReservation = GameSession & {
  reservation: NonNullable<GameSession['reservation']>;
  _count: { registrations: number };
};

export default async function CalendarPage() {
  const [rawEvents, rawSessions]: [any[], any[]] = await Promise.all([
    db.event.findMany({
      where: { published: true },
      include: { _count: { select: { registrations: true } } },
      orderBy: { startTime: 'asc' },
    }),
    db.gameSession.findMany({
      include: {
        reservation: { select: { startTime: true, endTime: true } },
        _count: { select: { registrations: true } },
      },
    }),
  ]);

  const events = rawEvents as EventWithCount[];
  const sessions = rawSessions as SessionWithReservation[];

  const items: CalendarItem[] = [
    ...events.map((e) => ({
      id: e.id,
      title: e.title,
      date: new Date(e.startTime),
      type: 'event' as const,
      spotsLeft: e.capacity ? e.capacity - e._count.registrations : Infinity,
      totalSpots: e.capacity ?? 0,
    })),
    ...sessions
      .filter((s): s is SessionWithReservation => s.reservation != null)
      .map((s) => ({
        id: s.id,
        title: s.title,
        date: new Date(s.reservation.startTime),
        type: 'session' as const,
        spotsLeft: s.maxPlayers - s._count.registrations,
        totalSpots: s.maxPlayers,
      })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Event Calendar</h1>
        <p className="text-muted-foreground">Upcoming sessions and events at Hramelot</p>
      </div>
      <CalendarView items={items} />
    </div>
  );
}
