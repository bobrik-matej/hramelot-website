import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hramelot Košice | Tabletop Gaming Club',
  description:
    "Your local home for board games and TTRPGs in Košice. Whether you're a pro or a beginner, there's a seat for you. Pick a game from our schedule or sign in to reserve your table.",
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      <Image
        src="/images/hramelot-dragon-background.webp"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #120f0c)' }}
      />
      <main className="relative z-10 max-w-3xl text-center">
        <h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-6xl">
          Hramelot Košice
        </h1>
        <p className="text-muted-foreground mt-6 text-lg leading-8">
          Your local home for board games and TTRPGs. Whether you&apos;re a pro or a beginner,
          there&apos;s a seat for you. Pick a game from our schedule or sign in to reserve your
          table.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Public Link */}
          <Link
            href="/calendar"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            View Game Calendar
          </Link>

          {/* Members Link */}
          <Link
            href="/members"
            className="border-border text-foreground hover:bg-accent rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
          >
            Member Portal
          </Link>
        </div>
      </main>
    </div>
  );
}
