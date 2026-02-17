import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Create connection similar to your db.ts
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting seed...");

    // Create test tables
    const table1 = await prisma.table.create({
        data: {
            name: "Main Hall Table",
            capacity: 6,
        },
    });

    const table2 = await prisma.table.create({
        data: {
            name: "Dragon's Den",
            capacity: 4,
        },
    });

    console.log("✅ Created tables:", { table1, table2 });

    // Optionally create a test user (if you don't have one from auth yet)
    const testUser = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@hramelot.local",
            role: "MEMBER",
        },
    });

    console.log("✅ Created test user:", testUser);

    console.log("🎉 Seed completed!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });