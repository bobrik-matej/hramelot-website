import { successResponse } from "@/lib/api-helpers";

const ROLES = [
    { value: "PUBLIC", label: "Public", description: "Not signed in – can view public content" },
    { value: "USER", label: "User", description: "Signed in via Discord – can register for events/sessions" },
    { value: "MEMBER", label: "Member", description: "Paid membership – can book tables, borrow games" },
    { value: "MASTER", label: "Master", description: "Runs 2+ sessions/month – can create sessions, priority booking" },
    { value: "ADMIN", label: "Admin", description: "Full control over users, content, and settings" },
];

export async function GET() {
    return successResponse(ROLES);
}
