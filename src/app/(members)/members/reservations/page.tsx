import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReservationsList } from '@/components/reservations/ReservationsList';
import { CreateReservationButton } from '@/components/reservations/CreateReservationButton';

async function getReservations() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations`, {
    cache: 'no-store', // Always get fresh data
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reservations');
  }

  return response.json();
}

export default async function ReservationsPage() {
  const reservations = await getReservations();

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
