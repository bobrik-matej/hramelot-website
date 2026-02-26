import { type DefaultSession } from 'next-auth';
import { type AdapterUser as BaseAdapterUser } from '@auth/core/adapters';
import type { UserRole } from '@/generated/prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `auth`, contains the session data.
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  /**
   * The shape of the user object returned in the OAuth profile or database.
   */
  interface User {
    id?: string;
    role?: UserRole;
  }
}

declare module '@auth/core/adapters' {
  /**
   * Augment the AdapterUser to include your custom database fields.
   */
  interface AdapterUser extends BaseAdapterUser {
    role?: UserRole;
  }
}
