import type { UserRole } from "../generated/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: UserRole;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
        role: UserRole;
    }
}