import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { PricingCard } from '@/components/join/PricingCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { applyForMembershipAction } from './actions';

export const metadata: Metadata = {
  title: 'Join Hramelot | Become a Member',
  description:
    'Become a member of Hramelot, the premier tabletop gaming club in Košice. Book tables, join D&D campaigns, borrow games, and connect with local players.',
};

export default async function JoinPage() {
  const session = await auth();

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Become a Member</h1>
        <p className="text-muted-foreground">Join the Hramelot community</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <PricingCard
          title="USER"
          price="Free"
          features={[
            { text: 'Register for public events' },
            { text: 'Browse game library' },
            { text: 'Join open sessions' },
          ]}
        >
          <Button variant="outline" className="w-full" asChild>
            <Link href="/api/auth/signin">Sign Up with Discord</Link>
          </Button>
        </PricingCard>

        <PricingCard
          title="MEMBER"
          price="€X/month"
          highlighted
          features={[
            { text: 'All USER benefits' },
            { text: 'Book tables', bold: true },
            { text: 'Borrow games' },
            { text: 'Member-only resources' },
            { text: 'Discounts on events' },
          ]}
        >
          {session?.user ? (
            <form action={applyForMembershipAction}>
              <Button type="submit" className="w-full">
                Become a Member
              </Button>
            </form>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/signin?callbackUrl=/join">Sign In to Apply</Link>
            </Button>
          )}
        </PricingCard>

        <PricingCard
          title="MASTER"
          price="Earned"
          features={[
            { text: 'All MEMBER benefits' },
            { text: 'Priority table booking', bold: true },
            { text: 'Create sessions' },
            { text: 'Campaign management tools' },
          ]}
        >
          <p className="text-muted-foreground text-xs">Run 2+ sessions per month to qualify</p>
        </PricingCard>
      </div>
    </div>
  );
}

