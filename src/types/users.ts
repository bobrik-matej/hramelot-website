import type { UserRole, ApplicationStatus } from './shared';

export interface UserProfile {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role: UserRole;
  membershipActive: boolean;
  membershipStart?: string | Date | null;
  membershipEnd?: string | Date | null;
  sessionsHosted: number;
  masterSince?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface MemberApplication {
  id: string;
  userId: string;
  status: ApplicationStatus;
  message?: string | null;
  reviewedBy?: string | null;
  reviewNote?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  user?: Pick<UserProfile, 'id' | 'name' | 'email' | 'image'>;
}
