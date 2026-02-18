import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

// Import from your custom Prisma client location
import type { UserRole } from "@/generated/prisma/enums";

// Helper function to fetch Discord guild member data
async function fetchDiscordGuildMember(accessToken: string) {
    const guildId = process.env.DISCORD_GUILD_ID;
    if (!guildId) {
        console.error("DISCORD_GUILD_ID is not set");
        return null;
    }

    try {
        const response = await fetch(
            `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            console.error("Failed to fetch guild member:", response.statusText);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching Discord guild member:", error);
        return null;
    }
}

// Helper function to map Discord roles to app roles
function mapDiscordRolesToAppRole(discordRoles: string[]): UserRole {
    const adminRoleId = process.env.DISCORD_ADMIN_ROLE_ID;
    const memberRoleId = process.env.DISCORD_MEMBER_ROLE_ID;

    if (adminRoleId && discordRoles.includes(adminRoleId)) {
        return "ADMIN";
    }

    if (memberRoleId && discordRoles.includes(memberRoleId)) {
        return "MEMBER";
    }

    return "USER";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "identify email guilds guilds.members.read"
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Fetch Discord guild member data when user signs in
            if (account?.provider === "discord" && account.access_token && user?.id) {
                const guildMember = await fetchDiscordGuildMember(account.access_token);

                if (guildMember && guildMember.roles && Array.isArray(guildMember.roles)) {
                    // Map Discord roles to app role
                    const appRole = mapDiscordRolesToAppRole(guildMember.roles);

                    // Update user role in database
                    try {
                        await db.user.update({
                            where: { id: user.id },
                            data: {
                                role: appRole,
                            },
                        });

                        console.log(`✅ Synced roles for ${user.email}: ${appRole}`);
                    } catch (error) {
                        console.error("Failed to update user role:", error);
                    }
                }
            }

            return true;
        },

        async session({ session, user }) {
            if (session?.user && user?.id) {
                // Fetch fresh user data from database (includes role)
                const dbUser = await db.user.findUnique({
                    where: { id: user.id },
                    select: {
                        id: true,
                        role: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                });

                if (dbUser) {
                    session.user.id = dbUser.id;
                    session.user.role = dbUser.role;
                }
            }
            return session;
        },
    },
});