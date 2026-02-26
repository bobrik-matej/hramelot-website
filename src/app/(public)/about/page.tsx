import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Hramelot | Tabletop Gaming Club in Košice',
  description:
    'Learn about Hramelot, the premier tabletop gaming community in Košice. Discover our mission, what we offer, and our community values.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">About Hramelot</h1>
        <p className="text-muted-foreground">Košice&apos;s premier tabletop gaming community</p>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <section>
            <h2 className="mb-3 text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              Hramelot was founded to bring together tabletop gaming enthusiasts in Košice. We
              provide a dedicated space for D&D campaigns, board game nights, and wargaming
              sessions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">What We Offer</h2>
            <ul className="text-muted-foreground list-inside list-disc space-y-2">
              <li>Multiple gaming tables with professional setups</li>
              <li>Extensive board game and RPG library</li>
              <li>Regular campaigns and one-shot sessions</li>
              <li>Tournaments and community events</li>
              <li>Beginner-friendly environment</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">Community Values</h2>
            <p className="text-muted-foreground">
              Respect, inclusivity, and fun. Everyone is welcome at our table, regardless of
              experience level or gaming preferences.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
