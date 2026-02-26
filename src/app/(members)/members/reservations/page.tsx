'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useReservations } from '@/hooks/useReservations';

export default function ReservationsPage() {
  const { reservations, loading, error, createReservation } = useReservations();

  async function handleCreateReservation() {
    const result = await createReservation({
      title: 'Test Reservation',
      startTime: new Date('2026-03-01T18:00:00').toISOString(),
      endTime: new Date('2026-03-01T21:00:00').toISOString(),
      tableId: 'replace-with-real-table-id',
      userId: 'replace-with-real-user-id',
    });

    if (result.success) {
      alert('Reservation created!');
    } else {
      alert('Failed to create reservation');
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Reservations</CardTitle>
          <CardDescription>View and manage table reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleCreateReservation} className="mb-4">
            Create Test Reservation
          </Button>

          <div className="space-y-4">
            {reservations.length === 0 ? (
              <p className="text-muted-foreground">No reservations yet</p>
            ) : (
              reservations.map((reservation) => (
                <div key={reservation.id} className="rounded-lg border p-4">
                  <h3 className="font-bold">{reservation.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    Table: {reservation.table.name} (Capacity: {reservation.table.capacity})
                  </p>
                  <p className="text-sm">
                    {new Date(reservation.startTime).toLocaleString()} -{' '}
                    {new Date(reservation.endTime).toLocaleString()}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Reserved by: {reservation.user.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
