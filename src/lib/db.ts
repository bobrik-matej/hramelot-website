import "dotenv/config";
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@prisma/client";

const connectionString = `${process.env.DIRECT_URL}`;

const adapter = new PrismaPg({connectionString});

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Pass the adapter to the PrismaClient constructor
export const db = globalThis.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

// Re-export types for convenience
export {UserRole} from "@prisma/client";
