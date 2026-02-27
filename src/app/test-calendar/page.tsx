import CalendarView from '@/components/calendar/CalendarView';

export default function TestCalendarPage() {
  const items = [
    { id: '1', title: 'Game Night', date: new Date(), type: 'session' as const, spotsLeft: 3, totalSpots: 6 },
    { id: '2', title: 'D&D Campaign', date: new Date(Date.now() + 86400000 * 3), type: 'session' as const, spotsLeft: 2, totalSpots: 5 },
    { id: '3', title: 'Board Game Event', date: new Date(Date.now() + 86400000 * 7), type: 'event' as const, spotsLeft: 5, totalSpots: 10 },
  ];
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Calendar Test</h1>
      <CalendarView items={items} />
    </div>
  );
}
