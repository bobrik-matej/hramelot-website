'use client';

import { useState } from 'react';
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

export default function NewReservationPage() {
  const [loading, setLoading] = useState(false);

  // TODO: Fetch available tables from API
  const tables = [
    { id: '1', name: 'Main Hall', capacity: 8 },
    { id: '2', name: "Dragon's Den", capacity: 6 },
    { id: '3', name: 'Side Room', capacity: 4 },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: Submit to API
    console.log('Creating reservation...');
    setLoading(false);
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a Table</CardTitle>
          <CardDescription>Reserve space for your gaming session</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input id="title" placeholder="e.g., D&D Campaign Session 5" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="table">Select Table</Label>
              <Select required>
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
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input id="time" type="time" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input id="duration" type="number" min="1" max="8" defaultValue="3" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" placeholder="Any special requirements..." />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Book Table'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
