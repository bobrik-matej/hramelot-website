import { Reservation } from '@/types';
import { format } from 'date-fns';

type Props = {
  reservations: Reservation[];
};

function isPopulatedReservation(
  reservation: Reservation,
): reservation is Reservation & {
  table: NonNullable<Reservation['table']>;
  user: NonNullable<Reservation['user']>;
} {
  return !!reservation.table && !!reservation.user;
}

export function ReservationsList({ reservations }: Props) {
  if (reservations.length === 0) {
    return <p className="text-muted-foreground">No reservations yet</p>;
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => {
        // Use the type guard to handle missing data gracefully
        if (!isPopulatedReservation(reservation)) {
          return null;
        }

        return (
          <div key={reservation.id} className="rounded-lg border p-4">
            <h3 className="font-bold">{reservation.title}</h3>
            <p className="text-muted-foreground text-sm">
              Table: {reservation.table.name} (Capacity: {reservation.table.capacity})
            </p>
            <p className="text-sm">
              {format(new Date(reservation.startTime), 'PPp')} -{' '}
              {format(new Date(reservation.endTime), 'p')}
            </p>
            <p className="text-muted-foreground text-sm">Reserved by: {reservation.user.name}</p>
          </div>
        );
      })}
    </div>
  );
}
