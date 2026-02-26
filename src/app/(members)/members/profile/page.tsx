import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  // Placeholder: Replace with actual user data from auth/database
  const user = {
    name: 'Gandalf the Grey',
    username: 'gandalf',
    email: 'gandalf@hramelot.local',
    character: 'Wizard - Level 20',
    joinedDate: 'January 2024',
    avatarUrl: '/placeholder-avatar.png',
  };

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
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Character</label>
              <p className="text-muted-foreground text-sm">{user.character}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Member Since</label>
              <p className="text-muted-foreground text-sm">{user.joinedDate}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button>Edit Profile</Button>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
