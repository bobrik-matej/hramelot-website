import type { BorrowStatus } from "./shared";

export interface Game {
    id: string;
    title: string;
    description?: string | null;
    image?: string | null;
    bggId?: string | null;
    minPlayers: number;
    maxPlayers: number;
    available: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    _count?: { borrows: number };
}

export interface BorrowRecord {
    id: string;
    gameId: string;
    userId: string;
    status: BorrowStatus;
    borrowedAt: string | Date;
    dueAt?: string | Date | null;
    returnedAt?: string | Date | null;
    condition?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    game?: Pick<Game, "id" | "title" | "image">;
    user?: {
        id: string;
        name?: string | null;
        image?: string | null;
    };
}