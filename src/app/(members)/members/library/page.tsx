import { db } from '@/lib/db';
import type { Game } from '@/types/games';
import { GameCard } from '@/components/games/GameCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default async function LibraryPage() {
  const games: Game[] = await db.game.findMany({ orderBy: { title: 'asc' } });

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Game Library</h1>
        <p className="text-muted-foreground">Browse and borrow from our collection</p>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
        <Input placeholder="Search games..." className="pl-10" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game}>
            {/* TODO: Add borrow button for MEMBER+ */}
          </GameCard>
        ))}
      </div>
    </div>
  );
}
