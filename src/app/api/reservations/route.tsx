import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all reservations
export async function GET() {
    try {
        const reservations = await db.reservation.findMany({
            include: {
                table: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                startTime: 'desc'
            }
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json(
            { error: "Failed to fetch reservations" },
            { status: 500 }
        );
    }
}

// POST create a new reservation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, startTime, endTime, tableId, userId } = body;

        // Basic validation
        if (!title || !startTime || !endTime || !tableId || !userId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const reservation = await db.reservation.create({
            data: {
                title,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                tableId,
                userId,
            },
            include: {
                table: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            }
        });

        return NextResponse.json(reservation, { status: 201 });
    } catch (error) {
        console.error("Error creating reservation:", error);
        return NextResponse.json(
            { error: "Failed to create reservation" },
            { status: 500 }
        );
    }
}