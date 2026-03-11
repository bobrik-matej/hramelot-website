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
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Dragon background — upper half, right side, 2/3 width */}
      <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-2/3">
        <Image
          src="/images/hramelot-dragon-background.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient at the bottom to smoothly blend into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#120f0c]" />
      </div>

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
