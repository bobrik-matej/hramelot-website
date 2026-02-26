import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReservationsList } from '@/components/reservations/ReservationsList';
import { CreateReservationButton } from '@/components/reservations/CreateReservationButton';
import { Reservation } from '@/types';
import { db } from '@/lib/db';

export default async function ReservationsPage() {
  const reservations: Reservation[] = await db.reservation.findMany({
    include: {
      table: true,
      user: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Reservations</CardTitle>
          <CardDescription>View and manage table reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateReservationButton />
          <ReservationsList reservations={reservations} />
        </CardContent>
      </Card>
    </div>
  );
}
