import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

// Role hierarchy: higher index = higher privilege
const ROLE_HIERARCHY: UserRole[] = ["PUBLIC", "USER", "MEMBER", "MASTER", "ADMIN"];

export function roleAtLeast(userRole: UserRole, required: UserRole): boolean {
    return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(required);
}

// Standard success response
export function successResponse<T>(data: T, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

// Standard error response
export function errorResponse(message: string, status: number, code?: string) {
    return NextResponse.json(
        { success: false, error: { message, ...(code ? { code } : {}) } },
        { status }
    );
}

// Get current session or return 401
export async function requireAuth() {
    const session = await auth();
    if (!session?.user?.id) {
        return { session: null, error: errorResponse("Unauthorized", 401) };
    }
    return { session, error: null };
}

// Require a minimum role
export async function requireRole(required: UserRole) {
    const { session, error } = await requireAuth();
    if (error) return { session: null, error };
    const userRole = (session!.user as any).role as UserRole ?? "USER";
    if (!roleAtLeast(userRole, required)) {
        return { session: null, error: errorResponse("Forbidden", 403) };
    }
    return { session, error: null };
}

// Parse pagination from URL search params
export function parsePagination(searchParams: URLSearchParams) {
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}

// Parse sorting from URL search params
export function parseSorting(
    searchParams: URLSearchParams,
    allowedFields: string[],
    defaultField = "createdAt"
) {
    const sortBy = allowedFields.includes(searchParams.get("sortBy") ?? "")
        ? searchParams.get("sortBy")!
        : defaultField;
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";
    return { sortBy, order } as const;
}
