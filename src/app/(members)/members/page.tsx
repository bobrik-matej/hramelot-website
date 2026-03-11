import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you have some UI components
import { BookOpen, CalendarDays, User } from 'lucide-react';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return <div>Please sign in</div>;
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {user.name || 'Adventurer'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          You are currently logged in as a{' '}
          <span className="text-primary font-semibold">{user.role || 'Member'}</span> of Hramelot.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions / Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Reservations</CardTitle>
            <CalendarDays className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Tables</div>
            <p className="text-muted-foreground text-xs">Book your next campaign session</p>
            <Link
              href="/members/reservations"
              className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
            >
              View bookings &rarr;
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Settings</CardTitle>
            <User className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Account</div>
            <p className="text-muted-foreground text-xs">Update your details and preferences</p>
            <Link
              href="/members/profile"
              className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
            >
              Edit profile &rarr;
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Club Lore</CardTitle>
            <BookOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">The Archives</div>
            <p className="text-muted-foreground text-xs">Explore the history of the club</p>
            <Link
              href="/lore"
              className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
            >
              Read more &rarr;
            </Link>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">Upcoming Club Activities</h2>
        <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
          <p className="text-muted-foreground">
            No upcoming events found. Why not{' '}
            <Link href="/calendar" className="text-primary hover:underline">
              check the calendar
            </Link>{' '}
            to see what&apos;s happening?
          </p>
        </div>
      </section>
    </div>
  );
}
