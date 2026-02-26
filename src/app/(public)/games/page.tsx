import { db } from '@/lib/db';
import type { Game } from '@/types/games';
import { GameCard } from '@/components/games/GameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function GamesPage() {
  const games: Game[] = await db.game.findMany({ orderBy: { title: 'asc' } });

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Games We Play</h1>
        <p className="text-muted-foreground">Explore our collection and systems</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.filter((g) => g.available).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
