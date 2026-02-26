import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Calendar, BookOpen, BarChart } from 'lucide-react';

export default function OrganizePage() {
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Game Master Control Center</h1>
        <p className="text-muted-foreground">Manage your sessions and campaigns</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              My Sessions
            </CardTitle>
            <CardDescription>Manage upcoming and past sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/members/organize/sessions">View Sessions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Campaigns
            </CardTitle>
            <CardDescription>Track your ongoing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/members/organize/campaigns">Manage Campaigns</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Player Management
            </CardTitle>
            <CardDescription>View registered players</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/members/organize/players">View Players</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Statistics
            </CardTitle>
            <CardDescription>Your hosting statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/members/organize/stats">View Stats</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
