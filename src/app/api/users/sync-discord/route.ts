import { db } from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/api-helpers";
import type { UserRole } from "@prisma/client";

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_ADMIN_ROLE_ID = process.env.DISCORD_ADMIN_ROLE_ID;
const DISCORD_MASTER_ROLE_ID = process.env.DISCORD_MASTER_ROLE_ID;
const DISCORD_MEMBER_ROLE_ID = process.env.DISCORD_MEMBER_ROLE_ID;

function mapRoles(discordRoles: string[]): UserRole {
    if (DISCORD_ADMIN_ROLE_ID && discordRoles.includes(DISCORD_ADMIN_ROLE_ID)) return "ADMIN";
    if (DISCORD_MASTER_ROLE_ID && discordRoles.includes(DISCORD_MASTER_ROLE_ID)) return "MASTER";
    if (DISCORD_MEMBER_ROLE_ID && discordRoles.includes(DISCORD_MEMBER_ROLE_ID)) return "MEMBER";
    return "USER";
}

export async function POST() {
    const { session, error } = await requireAuth();
    if (error) return error;

    if (!DISCORD_GUILD_ID) return errorResponse("Discord guild not configured", 500);

    // Get the user's Discord access token from the Account table
    const account = await db.account.findFirst({
        where: { userId: session!.user!.id!, provider: "discord" },
        select: { access_token: true },
    });

    if (!account?.access_token) return errorResponse("No Discord account linked", 400);

    const resp = await fetch(
        `https://discord.com/api/v10/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
        { headers: { Authorization: `Bearer ${account.access_token}` } }
    );

    if (!resp.ok) return errorResponse("Failed to fetch Discord roles", 502);

    const guildMember = await resp.json();
    const appRole = mapRoles(guildMember.roles ?? []);

    const user = await db.user.update({
        where: { id: session!.user!.id! },
        data: { role: appRole },
        select: { id: true, role: true },
    });

    return successResponse({ ...user, synced: true });
}
