import { describe, it, expect } from 'vitest';
import {
  userSchema,
  tableSchema,
  reservationSchema,
  gameSessionSchema,
  eventSchema,
  gameSchema,
  memberApplicationSchema,
  registrationSchema,
  reviewApplicationSchema,
  roleUpdateSchema,
} from '@/lib/schemas';

// Reusable CUID-shaped strings (good enough for schema tests)
const cuid = 'clxxxxxxxxxxxxxxxxxxxxxxxx';

describe('userSchema', () => {
  it('accepts valid user data', () => {
    expect(userSchema.safeParse({ name: 'Alice', email: 'alice@example.com' }).success).toBe(true);
  });

  it('rejects name shorter than 2 characters', () => {
    expect(userSchema.safeParse({ name: 'A', email: 'alice@example.com' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(userSchema.safeParse({ name: 'Alice', email: 'not-an-email' }).success).toBe(false);
  });
});

describe('tableSchema', () => {
  it('accepts valid table', () => {
    expect(tableSchema.safeParse({ name: 'Table 1', capacity: 4 }).success).toBe(true);
  });

  it('rejects negative capacity', () => {
    expect(tableSchema.safeParse({ name: 'Table 1', capacity: -1 }).success).toBe(false);
  });
});

describe('reservationSchema', () => {
  const base = {
    title: 'Evening session',
    startTime: new Date('2025-01-01T18:00:00Z'),
    endTime: new Date('2025-01-01T20:00:00Z'),
    tableId: cuid,
    userId: cuid,
  };

  it('accepts valid reservation', () => {
    expect(reservationSchema.safeParse(base).success).toBe(true);
  });

  it('rejects when endTime is before startTime', () => {
    const result = reservationSchema.safeParse({ ...base, endTime: base.startTime });
    expect(result.success).toBe(false);
  });

  it('rejects title shorter than 3 characters', () => {
    expect(reservationSchema.safeParse({ ...base, title: 'Hi' }).success).toBe(false);
  });
});

describe('gameSessionSchema', () => {
  const base = { title: 'D&D Night', system: 'D&D 5e', minPlayers: 3, maxPlayers: 5 };

  it('accepts valid session', () => {
    expect(gameSessionSchema.safeParse(base).success).toBe(true);
  });

  it('rejects when maxPlayers is less than minPlayers', () => {
    expect(gameSessionSchema.safeParse({ ...base, maxPlayers: 2 }).success).toBe(false);
  });

  it('rejects empty system', () => {
    expect(gameSessionSchema.safeParse({ ...base, system: '' }).success).toBe(false);
  });
});

describe('eventSchema', () => {
  const base = {
    title: 'Annual Meet',
    startTime: new Date('2025-06-01T10:00:00Z'),
    endTime: new Date('2025-06-01T18:00:00Z'),
  };

  it('accepts valid event', () => {
    expect(eventSchema.safeParse(base).success).toBe(true);
  });

  it('rejects when endTime equals startTime', () => {
    expect(eventSchema.safeParse({ ...base, endTime: base.startTime }).success).toBe(false);
  });

  it('rejects title shorter than 3 characters', () => {
    expect(eventSchema.safeParse({ ...base, title: 'Hi' }).success).toBe(false);
  });
});

describe('gameSchema', () => {
  const base = { title: 'Catan', minPlayers: 3, maxPlayers: 4 };

  it('accepts valid game', () => {
    expect(gameSchema.safeParse(base).success).toBe(true);
  });

  it('rejects empty title', () => {
    expect(gameSchema.safeParse({ ...base, title: '' }).success).toBe(false);
  });

  it('rejects when maxPlayers is less than minPlayers', () => {
    expect(gameSchema.safeParse({ ...base, maxPlayers: 1 }).success).toBe(false);
  });
});

describe('memberApplicationSchema', () => {
  it('accepts empty message', () => {
    expect(memberApplicationSchema.safeParse({}).success).toBe(true);
  });

  it('rejects message exceeding 2000 characters', () => {
    expect(memberApplicationSchema.safeParse({ message: 'a'.repeat(2001) }).success).toBe(false);
  });
});

describe('registrationSchema', () => {
  it('accepts valid registration', () => {
    expect(
      registrationSchema.safeParse({ gameSessionId: cuid, userId: cuid }).success,
    ).toBe(true);
  });

  it('rejects non-CUID gameSessionId', () => {
    expect(
      registrationSchema.safeParse({ gameSessionId: 'not-a-cuid', userId: cuid }).success,
    ).toBe(false);
  });
});

describe('reviewApplicationSchema', () => {
  it('accepts APPROVED status', () => {
    expect(reviewApplicationSchema.safeParse({ status: 'APPROVED' }).success).toBe(true);
  });

  it('rejects invalid status', () => {
    expect(reviewApplicationSchema.safeParse({ status: 'MAYBE' }).success).toBe(false);
  });
});

describe('roleUpdateSchema', () => {
  it('accepts valid roles', () => {
    for (const role of ['PUBLIC', 'USER', 'MEMBER', 'MASTER', 'ADMIN']) {
      expect(roleUpdateSchema.safeParse({ role }).success).toBe(true);
    }
  });

  it('rejects unknown role', () => {
    expect(roleUpdateSchema.safeParse({ role: 'SUPERUSER' }).success).toBe(false);
  });
});
