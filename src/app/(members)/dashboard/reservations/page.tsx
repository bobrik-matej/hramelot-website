"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Reservation = {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    table: {
        name: string;
        capacity: number;
    };
    user: {
        name: string;
        email: string;
    };
};

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch reservations
    useEffect(() => {
        async function fetchReservations() {
            try {
                const response = await fetch("/api/reservations");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setReservations(data);
            } catch (err) {
                setError("Could not load reservations");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchReservations();
    }, []);

    // Simple form submission
    async function handleCreateReservation() {
        // For POC: hardcoded values - replace with real form inputs
        const newReservation = {
            title: "Test Reservation",
            startTime: new Date("2026-03-01T18:00:00").toISOString(),
            endTime: new Date("2026-03-01T21:00:00").toISOString(),
            tableId: "replace-with-real-table-id", // You need to create a table first
            userId: "replace-with-real-user-id", // You need a real user ID
        };

        try {
            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReservation),
            });

            if (!response.ok) throw new Error("Failed to create");

            const created = await response.json();
            setReservations([created, ...reservations]);
            alert("Reservation created!");
        } catch (err) {
            alert("Failed to create reservation");
            console.error(err);
        }
    }

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Reservations</CardTitle>
                    <CardDescription>View and manage table reservations</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleCreateReservation} className="mb-4">
                        Create Test Reservation
                    </Button>

                    <div className="space-y-4">
                        {reservations.length === 0 ? (
                            <p className="text-muted-foreground">No reservations yet</p>
                        ) : (
                            reservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="border p-4 rounded-lg"
                                >
                                    <h3 className="font-bold">{reservation.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Table: {reservation.table.name} (Capacity: {reservation.table.capacity})
                                    </p>
                                    <p className="text-sm">
                                        {new Date(reservation.startTime).toLocaleString()} - {new Date(reservation.endTime).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Reserved by: {reservation.user.name}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}