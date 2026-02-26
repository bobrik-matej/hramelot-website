'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CreateReservationButton() {
  const router = useRouter();

  function handleClick() {
    // Navigate to a proper form page instead of test code
    router.push('/members/reservations/new');
  }

  return (
    <Button onClick={handleClick} className="mb-4">
      New Reservation
    </Button>
  );
}
