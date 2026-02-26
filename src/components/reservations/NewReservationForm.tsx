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
import type { Table } from '@/types/reservations';
import { createReservationAction } from '@/app/(members)/members/reservations/new/actions';

interface NewReservationFormProps {
  tables: Table[];
}

export default function NewReservationForm({ tables }: NewReservationFormProps) {
  const [state, formAction, pending] = useActionState(createReservationAction, null);

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a Table</CardTitle>
          <CardDescription>Reserve space for your gaming session</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state?.error && <p className="text-destructive text-sm">{state.error}</p>}

            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input id="title" name="title" placeholder="e.g., D&D Campaign Session 5" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableId">Select Table</Label>
              <Select name="tableId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a table" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((table) => (
                    <SelectItem key={table.id} value={table.id}>
                      {table.name} (Capacity: {table.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input id="time" name="time" type="time" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="8"
                defaultValue="3"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" name="notes" placeholder="Any special requirements..." />
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Creating...' : 'Book Table'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
