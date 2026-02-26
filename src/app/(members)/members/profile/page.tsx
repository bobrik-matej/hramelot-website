import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import type { UserProfile } from '@/types/users';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) return notFound();

  const user: UserProfile | null = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      membershipActive: true,
      membershipStart: true,
      membershipEnd: true,
      sessionsHosted: true,
      masterSince: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) return notFound();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Member Profile</CardTitle>
          <CardDescription>View and manage your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image ?? undefined} alt={user.name ?? ''} />
              <AvatarFallback>{(user.name ?? user.email ?? '?').charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name ?? '—'}</h2>
              <Badge className="mt-1">{user.role}</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Member Since</label>
              <p className="text-muted-foreground text-sm">
                {format(new Date(user.createdAt), 'MMMM yyyy')}
              </p>
            </div>
            {user.membershipActive && user.membershipEnd && (
              <div>
                <label className="text-sm font-medium">Membership Expires</label>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(user.membershipEnd), 'PPP')}
                </p>
              </div>
            )}
            {user.sessionsHosted > 0 && (
              <div>
                <label className="text-sm font-medium">Sessions Hosted</label>
                <p className="text-muted-foreground text-sm">{user.sessionsHosted}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
