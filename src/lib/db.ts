import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Create a connection pool using your Supabase connection string
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// 2. Pass the adapter to the PrismaClient constructor
export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}
