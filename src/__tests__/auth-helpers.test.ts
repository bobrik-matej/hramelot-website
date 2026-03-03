import { describe, it, expect } from 'vitest';
import {
  getUserRole,
  hasMinimumRole,
  hasRole,
  isAdmin,
  canOrganize,
  canMakeReservations,
  isAuthenticated,
} from '@/lib/auth-helpers';
import type { Session } from 'next-auth';

// Helpers to build minimal Session objects
function makeSession(role?: string): Session {
  return {
    user: { id: 'user-1', name: 'Test User', email: 'test@example.com', role } as any,
    expires: '2099-01-01',
  };
}

describe('getUserRole', () => {
  it('returns PUBLIC when session is null', () => {
    expect(getUserRole(null)).toBe('PUBLIC');
  });

  it('returns USER when session has no role', () => {
    expect(getUserRole(makeSession())).toBe('USER');
  });

  it('returns MEMBER for member role (case-insensitive)', () => {
    expect(getUserRole(makeSession('member'))).toBe('MEMBER');
  });

  it('returns MASTER for master role', () => {
    expect(getUserRole(makeSession('MASTER'))).toBe('MASTER');
  });

  it('returns ADMIN for admin role', () => {
    expect(getUserRole(makeSession('ADMIN'))).toBe('ADMIN');
  });
});

describe('hasMinimumRole', () => {
  it('PUBLIC has no minimum role except PUBLIC', () => {
    expect(hasMinimumRole(null, 'PUBLIC')).toBe(true);
    expect(hasMinimumRole(null, 'USER')).toBe(false);
  });

  it('USER satisfies USER and PUBLIC, but not MEMBER', () => {
    const session = makeSession();
    expect(hasMinimumRole(session, 'PUBLIC')).toBe(true);
    expect(hasMinimumRole(session, 'USER')).toBe(true);
    expect(hasMinimumRole(session, 'MEMBER')).toBe(false);
  });

  it('ADMIN satisfies every role', () => {
    const session = makeSession('ADMIN');
    for (const role of ['PUBLIC', 'USER', 'MEMBER', 'MASTER', 'ADMIN'] as const) {
      expect(hasMinimumRole(session, role)).toBe(true);
    }
  });

  it('MEMBER does not satisfy MASTER or ADMIN', () => {
    const session = makeSession('MEMBER');
    expect(hasMinimumRole(session, 'MASTER')).toBe(false);
    expect(hasMinimumRole(session, 'ADMIN')).toBe(false);
  });
});

describe('hasRole', () => {
  it('returns true for exact role match', () => {
    expect(hasRole(makeSession('MASTER'), 'MASTER')).toBe(true);
  });

  it('returns false when role does not match', () => {
    expect(hasRole(makeSession('ADMIN'), 'MASTER')).toBe(false);
  });
});

describe('isAdmin', () => {
  it('returns true only for ADMIN role', () => {
    expect(isAdmin(makeSession('ADMIN'))).toBe(true);
    expect(isAdmin(makeSession('MASTER'))).toBe(false);
    expect(isAdmin(null)).toBe(false);
  });
});

describe('canOrganize', () => {
  it('returns true for MASTER and ADMIN', () => {
    expect(canOrganize(makeSession('MASTER'))).toBe(true);
    expect(canOrganize(makeSession('ADMIN'))).toBe(true);
  });

  it('returns false for MEMBER and below', () => {
    expect(canOrganize(makeSession('MEMBER'))).toBe(false);
    expect(canOrganize(makeSession())).toBe(false);
    expect(canOrganize(null)).toBe(false);
  });
});

describe('canMakeReservations', () => {
  it('returns true for MEMBER, MASTER, and ADMIN', () => {
    expect(canMakeReservations(makeSession('MEMBER'))).toBe(true);
    expect(canMakeReservations(makeSession('MASTER'))).toBe(true);
    expect(canMakeReservations(makeSession('ADMIN'))).toBe(true);
  });

  it('returns false for USER and PUBLIC', () => {
    expect(canMakeReservations(makeSession())).toBe(false);
    expect(canMakeReservations(null)).toBe(false);
  });
});

describe('isAuthenticated', () => {
  it('returns false when session is null', () => {
    expect(isAuthenticated(null)).toBe(false);
  });

  it('returns true for any authenticated user', () => {
    expect(isAuthenticated(makeSession())).toBe(true);
    expect(isAuthenticated(makeSession('MEMBER'))).toBe(true);
  });
});
