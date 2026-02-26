import { z } from "zod";

// --- Enums (Matching Prisma) ---
export const UserRoleSchema = z.enum(["PUBLIC", "USER", "MEMBER", "MASTER", "ADMIN"]);
export const RegistrationStatusSchema = z.enum(["PENDING", "CONFIRMED", "WAITLIST", "CANCELLED"]);
export const ApplicationStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export const BorrowStatusSchema = z.enum(["BORROWED", "RETURNED", "OVERDUE"]);

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
    // optional: a session can exist without a reservation (standalone)
    reservationId: z.string().cuid("Invalid reservation reference").optional(),
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

// --- Event Schemas ---
export const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().max(5000, "Description is too long").optional(),
    location: z.string().optional(),
    startTime: z.coerce.date({ required_error: "Start time is required" }),
    endTime: z.coerce.date({ required_error: "End time is required" }),
    capacity: z.number().int().positive("Capacity must be positive").optional(),
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),
    published: z.boolean().default(true),
}).refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
});

export const eventRegistrationSchema = z.object({
    eventId: z.string().cuid(),
    userId: z.string().cuid(),
    status: RegistrationStatusSchema.default("CONFIRMED"),
});

// --- Game (Library) Schemas ---
export const gameSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().max(5000, "Description is too long").optional(),
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),
    bggId: z.string().optional(),
    minPlayers: z.number().int().min(1, "At least 1 player required").default(2),
    maxPlayers: z.number().int().min(1, "At least 1 player required").default(4),
}).refine((data) => data.maxPlayers >= data.minPlayers, {
    message: "Max players cannot be less than min players",
    path: ["maxPlayers"],
});

export const borrowSchema = z.object({
    dueAt: z.coerce.date().optional(),
});

// --- MemberApplication Schemas ---
export const memberApplicationSchema = z.object({
    message: z.string().max(2000, "Message is too long").optional(),
});

export const reviewApplicationSchema = z.object({
    status: ApplicationStatusSchema,
    reviewNote: z.string().max(1000, "Review note is too long").optional(),
});

// --- Role Update ---
export const roleUpdateSchema = z.object({
    role: UserRoleSchema,
});

// --- Types ---
export type UserInput = z.infer<typeof userSchema>;
export type TableInput = z.infer<typeof tableSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
export type GameSessionInput = z.infer<typeof gameSessionSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type GameInput = z.infer<typeof gameSchema>;
export type BorrowInput = z.infer<typeof borrowSchema>;
export type MemberApplicationInput = z.infer<typeof memberApplicationSchema>;
export type ReviewApplicationInput = z.infer<typeof reviewApplicationSchema>;
export type RoleUpdateInput = z.infer<typeof roleUpdateSchema>;