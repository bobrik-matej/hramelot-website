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

    // Create test users with different roles
    const testUser = await db.user.create({
        data: {
            name: "Test User",
            email: "user@hramelot.local",
            role: "USER",
        },
    });

    const testMember = await db.user.create({
        data: {
            name: "Test Member",
            email: "member@hramelot.local",
            role: "MEMBER",
            membershipActive: true,
            membershipStart: new Date(),
            membershipEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        },
    });

    const testMaster = await db.user.create({
        data: {
            name: "Test Master",
            email: "master@hramelot.local",
            role: "MASTER",
            membershipActive: true,
            membershipStart: new Date(),
            sessionsHosted: 5,
            masterSince: new Date(),
        },
    });

    const testAdmin = await db.user.create({
        data: {
            name: "Test Admin",
            email: "admin@hramelot.local",
            role: "ADMIN",
        },
    });

    console.log("✅ Created test users:", { testUser, testMember, testMaster, testAdmin });

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