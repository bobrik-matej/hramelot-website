import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminMembersPage() {
  // TODO: Fetch from API
  const members = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'MEMBER',
      discord: 'johndoe#1234',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'MASTER',
      discord: 'janesmith#5678',
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Member Management</h1>
          <p className="text-muted-foreground">Manage users and assign roles</p>
        </div>
        <Button>Add Member</Button>
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
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-muted-foreground text-sm">{member.email}</p>
                  <p className="text-muted-foreground text-xs">Discord: {member.discord}</p>
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
