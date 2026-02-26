import type { RegistrationStatus } from "./shared";

export interface ClubEvent {
    id: string;
    title: string;
    description?: string | null;
    location?: string | null;
    startTime: string | Date;
    endTime: string | Date;
    capacity?: number | null;
    image?: string | null;
    published: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    // optional counts/relations depending on endpoint
    _count?: { registrations: number };
    registrations?: EventRegistration[];
}

export interface EventRegistration {
    id: string;
    eventId: string;
    userId: string;
    status: RegistrationStatus;
    createdAt: string | Date;
    user?: {
        id: string;
        name?: string | null;
        image?: string | null;
    };
}