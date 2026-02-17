import {db} from "@/lib/db";

async function main() {
    console.log("🌱 Starting seed...");

    // Create test tables
    const table1 = await db.table.create({
        data: {
            name: "Main Hall Table",
            capacity: 6,
        },
    });

    const table2 = await db.table.create({
        data: {
            name: "Dragon's Den",
            capacity: 4,
        },
    });

    console.log("✅ Created tables:", { table1, table2 });

    // Optionally create a test user (if you don't have one from auth yet)
    const testUser = await db.user.create({
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
        await db.$disconnect();
    });