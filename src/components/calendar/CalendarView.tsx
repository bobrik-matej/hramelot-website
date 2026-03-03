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
        <CardHeader className="pb-3">
          <CardTitle>Select a Date</CardTitle>
          <CardDescription>Click on a date to see scheduled sessions</CardDescription>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          <div className="flex justify-center">
            <div className="w-full max-w-85">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                showOutsideDays
                className="rounded-md border"
                classNames={{
                  months: 'flex flex-col space-y-4',
                  month: 'space-y-4',
                  caption: 'flex justify-center pt-1 relative items-center',
                  caption_label: 'text-sm font-medium',
                  nav: 'space-x-1 flex items-center',
                  nav_button: 'h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100',
                  table: 'w-full border-collapse space-y-1',
                  head_row: 'flex',
                  head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                  row: 'flex w-full mt-2',
                  cell: 'text-center text-sm p-0 relative',
                  day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                  day_selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                  day_today: 'bg-accent text-accent-foreground',
                  day_outside: 'text-muted-foreground opacity-50',
                }}
                modifiers={{ hasEvent: itemDates }}
                modifiersClassNames={{
                  hasEvent:
                    'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-orange-500 after:rounded-full',
                }}
              />
            </div>
          </div>
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
                      {item.spotsLeft > 0
                        ? `${item.spotsLeft}/${item.totalSpots} spots left`
                        : 'Full'}
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
