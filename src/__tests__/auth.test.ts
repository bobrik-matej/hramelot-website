import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock heavy dependencies so the auth module can be imported without a real DB
// or a running NextAuth server.
vi.mock('@/lib/db', () => ({ db: {} }));
vi.mock('@auth/prisma-adapter', () => ({ PrismaAdapter: vi.fn(() => ({})) }));
vi.mock('next-auth', () => ({
  default: vi.fn(() => ({
    handlers: {},
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  })),
}));

// Provide the required Discord OAuth env vars before the module is loaded.
vi.stubEnv('DISCORD_CLIENT_ID', 'test-client-id');
vi.stubEnv('DISCORD_CLIENT_SECRET', 'test-client-secret');

const ADMIN_ROLE = 'role-admin-123';
const MASTER_ROLE = 'role-master-456';
const MEMBER_ROLE = 'role-member-789';

describe('mapDiscordRolesToAppRole', () => {
  beforeEach(() => {
    vi.stubEnv('DISCORD_ADMIN_ROLE_ID', ADMIN_ROLE);
    vi.stubEnv('DISCORD_MASTER_ROLE_ID', MASTER_ROLE);
    vi.stubEnv('DISCORD_MEMBER_ROLE_ID', MEMBER_ROLE);
  });

  it('returns ADMIN when the admin role ID is present', async () => {
    const { mapDiscordRolesToAppRole } = await import('@/lib/auth');
    expect(mapDiscordRolesToAppRole([ADMIN_ROLE, MASTER_ROLE])).toBe('ADMIN');
  });

  it('returns MASTER when master role is present but not admin', async () => {
    const { mapDiscordRolesToAppRole } = await import('@/lib/auth');
    expect(mapDiscordRolesToAppRole([MASTER_ROLE, MEMBER_ROLE])).toBe('MASTER');
  });

  it('returns MEMBER when only the member role is present', async () => {
    const { mapDiscordRolesToAppRole } = await import('@/lib/auth');
    expect(mapDiscordRolesToAppRole([MEMBER_ROLE])).toBe('MEMBER');
  });

  it('returns USER when no matching role is present', async () => {
    const { mapDiscordRolesToAppRole } = await import('@/lib/auth');
    expect(mapDiscordRolesToAppRole(['role-unknown-999'])).toBe('USER');
  });

  it('returns USER for an empty roles array', async () => {
    const { mapDiscordRolesToAppRole } = await import('@/lib/auth');
    expect(mapDiscordRolesToAppRole([])).toBe('USER');
  });
});

describe('DiscordGuildMember type', () => {
  it('is exported from auth module', async () => {
    // Type-level check: ensure DiscordGuildMember can be used as a type annotation.
    // If this compiles and runs, the export exists.
    const { mapDiscordRolesToAppRole } = await import('@/lib/auth');
    type GuildMember = import('@/lib/auth').DiscordGuildMember;
    const member: GuildMember = {
      roles: [ADMIN_ROLE],
      joined_at: '2024-01-01T00:00:00.000Z',
    };
    expect(mapDiscordRolesToAppRole(member.roles)).toBe('ADMIN');
  });
});
