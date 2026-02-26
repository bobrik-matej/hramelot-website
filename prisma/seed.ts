import { db } from "@/lib/db";
import { addDays, addHours } from "date-fns";

async function main() {
    console.log("🌱 Starting seed...");

    // ------------------------------------------------------------------ Tables
    const table1 = await db.table.create({
        data: { name: "Main Hall Table", capacity: 6 },
    });
    const table2 = await db.table.create({
        data: { name: "Dragon's Den", capacity: 4 },
    });
    const table3 = await db.table.create({
        data: { name: "Side Room", capacity: 4 },
    });
    console.log("✅ Created tables:", { table1, table2, table3 });

    // ------------------------------------------------------------------ Users
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
            membershipEnd: addDays(new Date(), 365),
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

    console.log("✅ Created users:", { testUser, testMember, testMaster, testAdmin });

    // ------------------------------------------------------------------ Reservations
    const now = new Date();

    const reservation1 = await db.reservation.create({
        data: {
            title: "Master's Weekly Campaign",
            startTime: addDays(now, 3),
            endTime: addHours(addDays(now, 3), 4),
            tableId: table1.id,
            userId: testMaster.id,
        },
    });

    const reservation2 = await db.reservation.create({
        data: {
            title: "Member's One-Shot",
            startTime: addDays(now, 5),
            endTime: addHours(addDays(now, 5), 3),
            tableId: table2.id,
            userId: testMember.id,
        },
    });

    const reservation3 = await db.reservation.create({
        data: {
            title: "Private Session",
            startTime: addDays(now, 7),
            endTime: addHours(addDays(now, 7), 2),
            tableId: table3.id,
            userId: testMember.id,
        },
    });

    console.log("✅ Created reservations:", { reservation1, reservation2, reservation3 });

    // ------------------------------------------------------------------ GameSessions
    const session1 = await db.gameSession.create({
        data: {
            title: "Curse of Strahd: Session 1",
            description: "Enter the mists of Barovia and face the vampire Strahd von Zarovich. New players welcome!",
            system: "D&D 5e",
            minPlayers: 3,
            maxPlayers: 5,
            organizerId: testMaster.id,
            reservationId: reservation1.id,
        },
    });

    const session2 = await db.gameSession.create({
        data: {
            title: "Abomination Vaults: One-Shot",
            description: "A thrilling Pathfinder one-shot in the classic dungeon format. Pre-made characters available.",
            system: "Pathfinder 2e",
            minPlayers: 2,
            maxPlayers: 4,
            organizerId: testMaster.id,
            reservationId: reservation2.id,
        },
    });

    // Standalone session (no reservation yet)
    const session3 = await db.gameSession.create({
        data: {
            title: "Blades in the Dark: Heist Night",
            description: "A scoundrels crew plans the perfect heist in the city of Doskvol.",
            system: "Blades in the Dark",
            minPlayers: 3,
            maxPlayers: 4,
            organizerId: testMaster.id,
        },
    });

    console.log("✅ Created game sessions:", { session1, session2, session3 });

    // ------------------------------------------------------------------ GameRegistrations
    const reg1 = await db.gameRegistration.create({
        data: {
            gameSessionId: session1.id,
            userId: testUser.id,
            status: "CONFIRMED",
            note: "Excited to try D&D for the first time!",
        },
    });

    const reg2 = await db.gameRegistration.create({
        data: {
            gameSessionId: session1.id,
            userId: testMember.id,
            status: "CONFIRMED",
        },
    });

    const reg3 = await db.gameRegistration.create({
        data: {
            gameSessionId: session2.id,
            userId: testUser.id,
            status: "PENDING",
            note: "Can I use a custom character?",
        },
    });

    console.log("✅ Created registrations:", { reg1, reg2, reg3 });

    // ------------------------------------------------------------------ Events
    const event1 = await db.event.create({
        data: {
            title: "Hramelot Game Night #12",
            description: "Monthly open game night! Bring your favourite board games or just show up and join a table.",
            location: "Hramelot HQ — Main Hall",
            startTime: addDays(now, 10),
            endTime: addHours(addDays(now, 10), 5),
            capacity: 30,
            published: true,
        },
    });

    const event2 = await db.event.create({
        data: {
            title: "D&D One-Shot Tournament",
            description: "Teams of 4 compete in a parallel one-shot dungeon. Prizes for fastest clear and best roleplay.",
            location: "Hramelot HQ — All Tables",
            startTime: addDays(now, 20),
            endTime: addHours(addDays(now, 20), 8),
            capacity: 16,
            published: true,
        },
    });

    const event3 = await db.event.create({
        data: {
            title: "Beginner's Workshop: How to Play D&D",
            description: "Never played a TTRPG? This free 2-hour workshop will teach you the basics.",
            location: "Hramelot HQ — Side Room",
            startTime: addDays(now, 14),
            endTime: addHours(addDays(now, 14), 2),
            capacity: 8,
            published: true,
        },
    });

    console.log("✅ Created events:", { event1, event2, event3 });

    // ------------------------------------------------------------------ EventRegistrations
    await db.eventRegistration.create({
        data: { eventId: event1.id, userId: testUser.id, status: "CONFIRMED" },
    });
    await db.eventRegistration.create({
        data: { eventId: event1.id, userId: testMember.id, status: "CONFIRMED" },
    });
    await db.eventRegistration.create({
        data: { eventId: event2.id, userId: testMaster.id, status: "CONFIRMED" },
    });
    await db.eventRegistration.create({
        data: { eventId: event3.id, userId: testUser.id, status: "CONFIRMED" },
    });

    console.log("✅ Created event registrations");

    // ------------------------------------------------------------------ Games (Library)
    const game1 = await db.game.create({
        data: {
            title: "Gloomhaven",
            description: "A game of Euro-inspired tactical combat in an evolving campaign world.",
            bggId: "174430",
            minPlayers: 1,
            maxPlayers: 4,
            available: false, // currently borrowed
        },
    });

    const game2 = await db.game.create({
        data: {
            title: "Wingspan",
            description: "A competitive, medium-weight, card-driven, engine-building board game about birds.",
            bggId: "266192",
            minPlayers: 1,
            maxPlayers: 5,
            available: true,
        },
    });

    const game3 = await db.game.create({
        data: {
            title: "Twilight Imperium (4th Ed.)",
            description: "An epic game of galactic conquest, politics, and trade.",
            bggId: "233078",
            minPlayers: 3,
            maxPlayers: 6,
            available: true,
        },
    });

    const game4 = await db.game.create({
        data: {
            title: "Spirit Island",
            description: "A cooperative game about defending an island from colonial invaders.",
            bggId: "162886",
            minPlayers: 1,
            maxPlayers: 4,
            available: true,
        },
    });

    console.log("✅ Created games:", { game1, game2, game3, game4 });

    // ------------------------------------------------------------------ BorrowRecords
    const borrow1 = await db.borrowRecord.create({
        data: {
            gameId: game1.id,
            userId: testMember.id,
            status: "BORROWED",
            borrowedAt: addDays(now, -3),
            dueAt: addDays(now, 11),
        },
    });

    console.log("✅ Created borrow records:", { borrow1 });

    // ------------------------------------------------------------------ MemberApplication
    const application1 = await db.memberApplication.create({
        data: {
            userId: testUser.id,
            status: "PENDING",
            message: "I've been attending game nights for 3 months and would love to become a full member!",
        },
    });

    console.log("✅ Created member applications:", { application1 });

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