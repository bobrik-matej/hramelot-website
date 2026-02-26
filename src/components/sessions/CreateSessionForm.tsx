'use client';

import { useActionState } from 'react';
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
import { createSessionAction } from '@/app/(members)/members/organize/sessions/new/actions';

export function CreateSessionForm() {
  const [state, formAction, pending] = useActionState(createSessionAction, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Session</CardTitle>
        <CardDescription>Set up a new game session or campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && <p className="text-destructive text-sm">{state.error}</p>}

          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input id="title" name="title" placeholder="e.g., Lost Mines of Phandelver" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="system">Game System</Label>
            <Select name="system" required>
              <SelectTrigger>
                <SelectValue placeholder="Select system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="D&D 5e">D&D 5th Edition</SelectItem>
                <SelectItem value="Pathfinder 2e">Pathfinder 2e</SelectItem>
                <SelectItem value="Call of Cthulhu">Call of Cthulhu</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="What's this session about?"
              rows={4}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minPlayers">Min Players</Label>
              <Input
                id="minPlayers"
                name="minPlayers"
                type="number"
                min="1"
                max="8"
                defaultValue="3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPlayers">Max Players</Label>
              <Input
                id="maxPlayers"
                name="maxPlayers"
                type="number"
                min="1"
                max="8"
                defaultValue="5"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating...' : 'Create Session'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
