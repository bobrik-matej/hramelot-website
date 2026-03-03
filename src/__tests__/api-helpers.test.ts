import { describe, it, expect, vi } from 'vitest';
import { roleAtLeast, parsePagination, parseSorting } from '@/lib/api-helpers';

// api-helpers imports next/server and @/lib/auth — mock those so we can
// test the pure helper functions without spinning up Next.js.
vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({ body, status: init?.status ?? 200 }),
  },
}));
vi.mock('@/lib/auth', () => ({ auth: vi.fn() }));

describe('roleAtLeast', () => {
  it('returns true when role equals required', () => {
    expect(roleAtLeast('MEMBER', 'MEMBER')).toBe(true);
  });

  it('returns true when role is higher than required', () => {
    expect(roleAtLeast('ADMIN', 'USER')).toBe(true);
    expect(roleAtLeast('MASTER', 'MEMBER')).toBe(true);
  });

  it('returns false when role is lower than required', () => {
    expect(roleAtLeast('USER', 'MEMBER')).toBe(false);
    expect(roleAtLeast('PUBLIC', 'ADMIN')).toBe(false);
  });
});

describe('parsePagination', () => {
  const params = (obj: Record<string, string>) => new URLSearchParams(obj);

  it('defaults to page 1 and limit 20', () => {
    const result = parsePagination(params({}));
    expect(result).toEqual({ page: 1, limit: 20, skip: 0 });
  });

  it('calculates skip correctly', () => {
    const result = parsePagination(params({ page: '3', limit: '10' }));
    expect(result).toEqual({ page: 3, limit: 10, skip: 20 });
  });

  it('clamps limit to 100', () => {
    const { limit } = parsePagination(params({ limit: '9999' }));
    expect(limit).toBe(100);
  });

  it('clamps page to minimum 1', () => {
    const { page, skip } = parsePagination(params({ page: '-5' }));
    expect(page).toBe(1);
    expect(skip).toBe(0);
  });

  it('clamps limit to minimum 1', () => {
    const { limit } = parsePagination(params({ limit: '0' }));
    expect(limit).toBe(1);
  });
});

describe('parseSorting', () => {
  const params = (obj: Record<string, string>) => new URLSearchParams(obj);

  it('defaults to the provided default field and desc order', () => {
    const result = parseSorting(params({}), ['name', 'createdAt']);
    expect(result).toEqual({ sortBy: 'createdAt', order: 'desc' });
  });

  it('accepts an allowed sort field', () => {
    const { sortBy } = parseSorting(params({ sortBy: 'name' }), ['name', 'createdAt']);
    expect(sortBy).toBe('name');
  });

  it('falls back to default when sortBy is not in allowed list', () => {
    const { sortBy } = parseSorting(params({ sortBy: 'evil' }), ['name', 'createdAt']);
    expect(sortBy).toBe('createdAt');
  });

  it('parses asc order', () => {
    const { order } = parseSorting(params({ order: 'asc' }), ['name'], 'name');
    expect(order).toBe('asc');
  });

  it('defaults to desc for unknown order values', () => {
    const { order } = parseSorting(params({ order: 'random' }), ['name'], 'name');
    expect(order).toBe('desc');
  });
});
