import { z } from "zod";

// --- Enums (Matching Prisma) ---
export const UserRoleSchema = z.enum(["USER", "MEMBER", "ADMIN"]);
export const RegistrationStatusSchema = z.enum(["PENDING", "CONFIRMED", "WAITLIST", "CANCELLED"]);

// --- User / Profile ---
export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    image: z.string().url().optional().or(z.literal("")),
});

// --- Table Schemas ---
export const tableSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    capacity: z.number().int().positive("Capacity must be a positive number").default(6),
});

// --- Reservation Schemas ---
export const reservationSchema = z.object({
    title: z.string().min(3, "Internal title is required for the booking"),
    startTime: z.coerce.date({ required_error: "Start time is required" }),
    endTime: z.coerce.date({ required_error: "End time is required" }),
    tableId: z.string().cuid("Invalid table reference"),
    userId: z.string().cuid("Invalid user reference"),
}).refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
});

// --- GameSession Schemas ---
export const gameSessionSchema = z.object({
    title: z.string().min(3, "Public title is required"),
    description: z.string().max(2000, "Description is too long").optional(),
    system: z.string().min(1, "Game system is required (e.g., D&D 5e)"),
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),
    minPlayers: z.number().int().min(1, "At least 1 player required").default(3),
    maxPlayers: z.number().int().min(1, "At least 1 player required").default(5),
    reservationId: z.string().cuid("Invalid reservation reference"),
}).refine((data) => data.maxPlayers >= data.minPlayers, {
    message: "Max players cannot be less than min players",
    path: ["maxPlayers"],
});

// --- GameRegistration Schemas ---
export const registrationSchema = z.object({
    gameSessionId: z.string().cuid(),
    userId: z.string().cuid(),
    status: RegistrationStatusSchema.default("PENDING"),
    note: z.string().max(500, "Note is too long").optional(),
});

// --- Types ---
export type UserInput = z.infer<typeof userSchema>;
export type TableInput = z.infer<typeof tableSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
export type GameSessionInput = z.infer<typeof gameSessionSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;