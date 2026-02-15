import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"; // Assuming you have some UI components
import { CalendarDays, User, BookOpen } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    // Protect the route
    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    const user = session.user;

    return (
        <div className="container mx-auto py-10 px-4">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user.name || "Adventurer"}!</h1>
                <p className="text-muted-foreground mt-2">
                    You are currently logged in as a <span className="font-semibold text-primary">{user.role || "Member"}</span> of Hramelot.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Actions / Stats */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">My Reservations</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Manage Tables</div>
                        <p className="text-xs text-muted-foreground">Book your next campaign session</p>
                        <Link
                            href="/dashboard/reservations"
                            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                        >
                            View bookings &rarr;
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Profile Settings</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Account</div>
                        <p className="text-xs text-muted-foreground">Update your details and preferences</p>
                        <Link
                            href="/dashboard/profile"
                            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                        >
                            Edit profile &rarr;
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Club Lore</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">The Archives</div>
                        <p className="text-xs text-muted-foreground">Explore the history of the club</p>
                        <Link
                            href="/lore"
                            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                        >
                            Read more &rarr;
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Club Activities</h2>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                    <p className="text-muted-foreground">
                        No upcoming events found. Why not <Link href="/calendar" className="text-primary hover:underline">check the calendar</Link> to see what's happening?
                    </p>
                </div>
            </section>
        </div>
    );
}