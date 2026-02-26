import { Session } from "next-auth";

/**
 * User role hierarchy for Hramelot
 */
export type UserRole = 'PUBLIC' | 'USER' | 'MEMBER' | 'MASTER' | 'ADMIN';

/**
 * Determines user role from NextAuth session
 * @param session - NextAuth session object
 * @returns UserRole - One of: PUBLIC, USER, MEMBER, MASTER, ADMIN
 */
export const getUserRole = (session: Session | null): UserRole => {
    if (!session?.user) return 'PUBLIC';

    const role = session.user.role?.toUpperCase();

    if (role === 'ADMIN') return 'ADMIN';
    if (role === 'MASTER') return 'MASTER';
    if (role === 'MEMBER') return 'MEMBER';
    if (session.user) return 'USER';

    return 'PUBLIC';
};

/**
 * Check if user has minimum required role
 * @param session - NextAuth session object
 * @param requiredRole - Minimum role required
 * @returns boolean
 */
export const hasMinimumRole = (session: Session | null, requiredRole: UserRole): boolean => {
    const roleHierarchy: Record<UserRole, number> = {
        'PUBLIC': 0,
        'USER': 1,
        'MEMBER': 2,
        'MASTER': 3,
        'ADMIN': 4,
    };

    const userRole = getUserRole(session);
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Check if user has exact role
 * @param session - NextAuth session object
 * @param role - Exact role to check
 * @returns boolean
 */
export const hasRole = (session: Session | null, role: UserRole): boolean => {
    return getUserRole(session) === role;
};

/**
 * Check if user can access admin features
 * @param session - NextAuth session object
 * @returns boolean
 */
export const isAdmin = (session: Session | null): boolean => {
    return getUserRole(session) === 'ADMIN';
};

/**
 * Check if user can organize sessions (MASTER or ADMIN)
 * @param session - NextAuth session object
 * @returns boolean
 */
export const canOrganize = (session: Session | null): boolean => {
    const role = getUserRole(session);
    return role === 'MASTER' || role === 'ADMIN';
};

/**
 * Check if user can make reservations (MEMBER, MASTER, or ADMIN)
 * @param session - NextAuth session object
 * @returns boolean
 */
export const canMakeReservations = (session: Session | null): boolean => {
    const role = getUserRole(session);
    return ['MEMBER', 'MASTER', 'ADMIN'].includes(role);
};

/**
 * Check if user is authenticated (any role except PUBLIC)
 * @param session - NextAuth session object
 * @returns boolean
 */
export const isAuthenticated = (session: Session | null): boolean => {
    return getUserRole(session) !== 'PUBLIC';
};