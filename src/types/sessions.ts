import type { RegistrationStatus } from "./shared";

export interface GameSession {
    id: string;
    title: string;
    description?: string | null;
    system: string;
    image?: string | null;
    minPlayers: number;
    maxPlayers: number;
    reservationId?: string | null;
    organizerId: string;
    reservation?: {
        id: string;
        startTime: string | Date;
        endTime: string | Date;
        table?: {
            id: string;
            name: string;
        };
    } | null;
    organizer?: {
        id: string;
        name?: string | null;
        image?: string | null;
    };
    _count?: { registrations: number };
    registrations?: GameRegistration[];
}

export interface GameRegistration {
    id: string;
    gameSessionId: string;
    userId: string;
    status: RegistrationStatus;
    note?: string | null;
    createdAt: string | Date;
    user?: {
        id: string;
        name?: string | null;
        image?: string | null;
        role?: string;
    };
    gameSession?: Pick<GameSession, "id" | "title">;
}