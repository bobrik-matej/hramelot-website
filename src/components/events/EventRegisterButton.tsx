'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface EventRegisterButtonProps {
  eventId: string;
  isFull: boolean;
  initialIsRegistered?: boolean;
}

export function EventRegisterButton({
  eventId,
  isFull,
  initialIsRegistered = false,
}: EventRegisterButtonProps) {
  const { data: session, status } = useSession();
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <Button size="lg" className="w-full md:w-auto" disabled>
        Loading...
      </Button>
    );
  }

  if (!session) {
    return (
      <Button size="lg" className="w-full md:w-auto" onClick={() => signIn('discord')}>
        Sign in to Register
      </Button>
    );
  }

  async function handleRegistration(method: 'POST' | 'DELETE') {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${eventId}/register`, { method });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error?.message ?? (method === 'POST' ? 'Failed to register' : 'Failed to cancel registration'));
      } else {
        setIsRegistered(method === 'POST');
      }
    } catch {
      setError(method === 'POST' ? 'Failed to register' : 'Failed to cancel registration');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-destructive text-sm">{error}</p>}
      {isRegistered ? (
        <Button
          size="lg"
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => handleRegistration('DELETE')}
          disabled={loading}
        >
          {loading ? 'Cancelling...' : 'Cancel Registration'}
        </Button>
      ) : (
        <Button
          size="lg"
          className="w-full md:w-auto"
          onClick={() => handleRegistration('POST')}
          disabled={loading || isFull}
        >
          {loading ? 'Registering...' : isFull ? 'Event Full' : 'Register for Event'}
        </Button>
      )}
    </div>
  );
}
