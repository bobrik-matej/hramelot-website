import { db } from '@/lib/db';
import type { UserProfile } from '@/types/users';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function AdminMembersPage() {
  const members: Pick<UserProfile, 'id' | 'name' | 'email' | 'image' | 'role'>[] =
    await db.user.findMany({
      select: { id: true, name: true, email: true, image: true, role: true },
      orderBy: { name: 'asc' },
    });

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Member Management</h1>
          <p className="text-muted-foreground">Manage users and assign roles</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>View and edit member details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.image ?? undefined} alt={member.name ?? ''} />
                    <AvatarFallback>
                      {(member.name ?? member.email ?? '?').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name ?? '—'}</p>
                    <p className="text-muted-foreground text-sm">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{member.role}</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
