'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, isSameDay } from 'date-fns';

export type CalendarItem = {
  id: string;
  title: string;
  date: Date;
  type: 'session' | 'event';
  spotsLeft: number;
  totalSpots: number;
};

interface CalendarViewProps {
  items: CalendarItem[];
}

export default function CalendarView({ items }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const itemDates = items.map((i) => i.date);

  const selectedDateItems = selectedDate
    ? items.filter((item) => isSameDay(item.date, selectedDate))
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      {/* Calendar Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select a Date</CardTitle>
          <CardDescription>Click on a date to see scheduled sessions</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full rounded-md border"
            modifiers={{ hasEvent: itemDates }}
            modifiersClassNames={{
              hasEvent:
                'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full',
            }}
          />
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'All Events'}
            </CardTitle>
            <CardDescription>
              {selectedDateItems.length > 0
                ? `${selectedDateItems.length} event${selectedDateItems.length > 1 ? 's' : ''} scheduled`
                : 'No events scheduled for this date'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(selectedDateItems.length > 0 ? selectedDateItems : items).map((item) => (
                <div
                  key={item.id}
                  className="hover:bg-accent space-y-2 rounded-lg border p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="leading-tight font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {format(item.date, 'EEE, MMM d · HH:mm')}
                      </p>
                    </div>
                    <Badge variant={item.type === 'session' ? 'default' : 'secondary'}>
                      {item.type}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {item.spotsLeft > 0 ? `${item.spotsLeft}/${item.totalSpots} spots left` : 'Full'}
                    </span>
                    <Button size="sm" disabled={item.spotsLeft === 0}>
                      {item.spotsLeft === 0 ? 'Full' : 'Register'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
