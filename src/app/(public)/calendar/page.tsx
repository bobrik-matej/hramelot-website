"use client";

import {useState} from "react";
import {Calendar} from "@/components/ui/calendar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {format, isSameDay} from "date-fns";

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    // Placeholder: Replace with actual events data from Supabase
    const events = [
        {
            id: 1,
            title: "D&D - Lost Mines Campaign",
            date: new Date("2026-02-20"),
            time: "18:00",
            type: "session",
            spotsLeft: 2,
            totalSpots: 5
        },
        {
            id: 2,
            title: "Magic: The Gathering Tournament",
            date: new Date("2026-02-22"),
            time: "14:00",
            type: "event",
            spotsLeft: 0,
            totalSpots: 16
        },
        {
            id: 3,
            title: "Warhammer 40K",
            date: new Date("2026-02-22"),
            time: "18:00",
            type: "session",
            spotsLeft: 4,
            totalSpots: 6
        },
        {
            id: 4,
            title: "Beginner's D&D Session",
            date: new Date("2026-02-22"),
            time: "19:00",
            type: "session",
            spotsLeft: 1,
            totalSpots: 4
        },
        {
            id: 5,
            title: "Pathfinder - Abomination Vaults",
            date: new Date("2026-02-27"),
            time: "18:00",
            type: "session",
            spotsLeft: 3,
            totalSpots: 6
        },
    ];

    // Get events that have dates matching calendar dates
    const eventDates = events.map(e => e.date);

    // Filter events for selected date
    const selectedDateEvents = selectedDate
        ? events.filter(event => isSameDay(event.date, selectedDate))
        : [];

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Event Calendar</h1>
                <p className="text-muted-foreground">Upcoming sessions and events at Hramelot</p>
            </div>

            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                {/* Calendar Section - Full Width */}
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
                            className="p-3 w-full relative"
                            classNames={{
                                months: "w-full",
                                month: "w-full space-y-4",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex w-full justify-between",
                                head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                                row: "flex w-full justify-between mt-2",
                                cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20 w-full",
                                day: "h-12 w-full md:h-16 p-0 font-normal aria-selected:opacity-100 hover:bg-accent",
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                day_today: "bg-accent text-accent-foreground",
                            }}
                            modifiers={{hasEvent: eventDates}}
                            modifiersClassNames={{
                                hasEvent: "after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full",
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Events List - Sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "All Events"}
                            </CardTitle>
                            <CardDescription>
                                {selectedDateEvents.length > 0
                                    ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`
                                    : "No events scheduled for this date"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {(selectedDateEvents.length > 0 ? selectedDateEvents : events).map((event) => (
                                    <div
                                        key={event.id}
                                        className="p-4 border rounded-lg hover:bg-accent transition-colors space-y-2"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <h3 className="font-semibold leading-tight">{event.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {format(event.date, "EEE, MMM d")} at {event.time}
                                                </p>
                                            </div>
                                            <Badge variant={event.type === "session" ? "default" : "secondary"}>
                                                {event.type}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">
                                                {event.spotsLeft > 0
                                                    ? `${event.spotsLeft}/${event.totalSpots} spots left`
                                                    : "Full"}
                                            </span>
                                            <Button
                                                size="sm"
                                                disabled={event.spotsLeft === 0}
                                            >
                                                {event.spotsLeft === 0 ? "Full" : "Register"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}