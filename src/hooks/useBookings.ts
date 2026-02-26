import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Booking {
  id: string;
  tableId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
}

export const useBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return response.json() as Promise<Booking[]>;
    },
  });

  const createBooking = useMutation({
    mutationFn: async (data: Omit<Booking, 'id'>) => {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  return {
    bookings,
    isLoading,
    createBooking: createBooking.mutate,
    isCreating: createBooking.isPending,
  };
};
