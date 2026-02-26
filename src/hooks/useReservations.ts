"use client";

import { useState, useEffect } from "react";
import { Reservation } from "@/types";

export function useReservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const createReservation = async (newReservation: Omit<Reservation, "id" | "table" | "user"> & { tableId: string; userId: string }) => {
        try {
            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReservation),
            });

            if (!response.ok) throw new Error("Failed to create");

            const created = await response.json();
            setReservations([created, ...reservations]);
            return { success: true, data: created };
        } catch (err) {
            console.error(err);
            return { success: false, error: err };
        }
    };

    return {
        reservations,
        loading,
        error,
        createReservation,
    };
}