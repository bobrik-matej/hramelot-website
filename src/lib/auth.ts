import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import type { UserRole } from '@prisma/client';

// Discord API response types
interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar?: string | null;
  email?: string | null;
}

export interface DiscordGuildMember {
  user?: DiscordUser;
  nick?: string | null;
  avatar?: string | null;
  roles: string[];
  joined_at: string;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string | null;
}

// Validate environment variables
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_ADMIN_ROLE_ID = process.env.DISCORD_ADMIN_ROLE_ID;
const DISCORD_MASTER_ROLE_ID = process.env.DISCORD_MASTER_ROLE_ID;
const DISCORD_MEMBER_ROLE_ID = process.env.DISCORD_MEMBER_ROLE_ID;

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
  throw new Error('Missing Discord OAuth credentials');
}

// Helper function to fetch Discord guild member data
async function fetchDiscordGuildMember(accessToken: string): Promise<DiscordGuildMember | null> {
  if (!DISCORD_GUILD_ID) {
    console.warn('⚠️ DISCORD_GUILD_ID is not set - role sync disabled');
    return null;
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Failed to fetch guild member:', {
        status: response.status,
        statusText: response.statusText,
        body: text,
      });
      return null;
    }

    const data = (await response.json()) as DiscordGuildMember;
    console.log('✅ Fetched Discord member data:', {
      userId: data.user?.id,
      roles: data.roles?.length || 0,
    });
    return data;
  } catch (error) {
    console.error('Error fetching Discord guild member:', error);
    return null;
  }
}

// Helper function to map Discord roles to app roles
export function mapDiscordRolesToAppRole(discordRoles: string[]): UserRole {
  console.log('🔍 Mapping roles:', {
    discordRoles,
    adminRoleId: DISCORD_ADMIN_ROLE_ID,
    masterRoleId: DISCORD_MASTER_ROLE_ID,
    memberRoleId: DISCORD_MEMBER_ROLE_ID,
  });

  if (DISCORD_ADMIN_ROLE_ID && discordRoles.includes(DISCORD_ADMIN_ROLE_ID)) {
    return 'ADMIN';
  }

  if (DISCORD_MASTER_ROLE_ID && discordRoles.includes(DISCORD_MASTER_ROLE_ID)) {
    return 'MASTER';
  }

  if (DISCORD_MEMBER_ROLE_ID && discordRoles.includes(DISCORD_MEMBER_ROLE_ID)) {
    return 'MEMBER';
  }

  return 'USER';
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify email guilds guilds.members.read',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔐 Sign-in callback triggered:', {
        userId: user?.id,
        email: user?.email,
        provider: account?.provider,
        hasAccessToken: !!account?.access_token,
      });

      // Sync Discord roles on sign-in for returning users (user already exists in DB).
      // New users are handled in events.linkAccount, which fires after the adapter
      // creates the user and links the account — making db.user.update safe to call.
      if (account?.provider === 'discord' && account.access_token && user?.id) {
        try {
          const existingUser = await db.user.findUnique({ where: { id: user.id } });

          if (existingUser) {
            const guildMember = await fetchDiscordGuildMember(account.access_token);

            if (guildMember?.roles && Array.isArray(guildMember.roles)) {
              const appRole = mapDiscordRolesToAppRole(guildMember.roles);

              await db.user.update({
                where: { id: user.id },
                data: { role: appRole },
              });

              console.log(`✅ Synced roles for ${user.email}: ${appRole}`);
            } else {
              console.warn(`⚠️ User ${user.email} not in guild or has no roles`);
            }
          }
          // If user doesn't exist yet, role assignment is deferred to events.linkAccount
        } catch (error) {
          console.error('❌ Failed to sync Discord roles:', error);
          // Don't block sign-in on role sync failure
        }
      }

      return true;
    },

    async session({ session, user }) {
      // With the Database strategy and PrismaAdapter,
      // 'user' is the object from your database.
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = (user as any).role; // Mapping the DB role to the session
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      // Fires after a new OAuth account is linked to a (newly created) user.
      // This is the correct place to assign the initial Discord role because the
      // user record now exists in the DB and the account's access_token is available.
      if (account.provider === 'discord' && account.access_token) {
        try {
          const guildMember = await fetchDiscordGuildMember(account.access_token);

          if (guildMember?.roles && Array.isArray(guildMember.roles)) {
            const appRole = mapDiscordRolesToAppRole(guildMember.roles);

            await db.user.update({
              where: { id: user.id },
              data: { role: appRole },
            });

            console.log(`✅ Assigned initial Discord role for new user ${user.email}: ${appRole}`);
          } else {
            console.warn(`⚠️ New user ${user.email} not in guild or has no roles`);
          }
        } catch (error) {
          console.error('❌ Failed to assign initial Discord role:', error);
        }
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'database', // Auth.js v5 with Prisma adapter uses database sessions
  },
});
