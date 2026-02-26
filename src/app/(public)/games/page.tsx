import { db } from '@/lib/db';
import type { Game } from '@/types/games';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function GamesPage() {
  const games: Game[] = await db.game.findMany({ orderBy: { title: 'asc' } });

  const renderGame = (game: Game) => (
    <Card key={game.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{game.title}</CardTitle>
          <Badge variant={game.available ? 'default' : 'secondary'}>
            {game.available ? 'Available' : 'Borrowed'}
          </Badge>
        </div>
        {game.description && <CardDescription>{game.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <span className="text-muted-foreground text-sm">
          {game.minPlayers}–{game.maxPlayers} players
        </span>
      </CardContent>
    </Card>
  );

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
            {games.map(renderGame)}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.filter((g) => g.available).map(renderGame)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
