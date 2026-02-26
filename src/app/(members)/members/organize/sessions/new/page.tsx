'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateSessionPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Session</CardTitle>
          <CardDescription>Set up a new game session or campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input id="title" placeholder="e.g., Lost Mines of Phandelver" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="system">Game System</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dnd5e">D&D 5th Edition</SelectItem>
                  <SelectItem value="pf2e">Pathfinder 2e</SelectItem>
                  <SelectItem value="coc">Call of Cthulhu</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="What's this session about?" rows={4} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Max Players</Label>
                <Input id="maxPlayers" type="number" min="1" max="8" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Player Level</Label>
                <Input id="level" placeholder="e.g., 1-3" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea id="requirements" placeholder="Experience level, materials needed..." />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Create Session
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
