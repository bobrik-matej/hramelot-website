"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

export default function ReservationsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Placeholder: Replace with actual reservation data
    const reservations = [
        { id: 1, date: "2026-02-20", time: "18:00", table: "Main Hall", status: "confirmed" },
        { id: 2, date: "2026-02-27", time: "19:00", table: "Dragon's Den", status: "pending" },
    ];

    return (
        <div className="container mx-auto py-8">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Reservation Calendar */}
                <Card>
                    <CardHeader>
                        <CardTitle>Book a Table</CardTitle>
                        <CardDescription>Select a date for your reservation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                        {date && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Available Time Slots:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" size="sm">17:00</Button>
                                    <Button variant="outline" size="sm">18:00</Button>
                                    <Button variant="outline" size="sm">19:00</Button>
                                    <Button variant="outline" size="sm">20:00</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* My Reservations */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Reservations</CardTitle>
                        <CardDescription>Upcoming table bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {reservations.map((reservation) => (
                                <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{reservation.table}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {reservation.date} at {reservation.time}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Badge variant={reservation.status === "confirmed" ? "default" : "secondary"}>
                                            {reservation.status}
                                        </Badge>
                                        <Button variant="ghost" size="sm">Cancel</Button>
                                    </div>
                                </div>
                            ))}
                            {reservations.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">No reservations yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}