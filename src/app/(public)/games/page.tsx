import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GamesPage() {
  const games = [
    {
      name: 'Dungeons & Dragons 5e',
      category: 'RPG',
      players: '3-6',
      description: 'Classic fantasy roleplaying',
    },
    { name: 'Pathfinder 2e', category: 'RPG', players: '3-6', description: 'Tactical fantasy RPG' },
    {
      name: 'Warhammer 40,000',
      category: 'Wargame',
      players: '2',
      description: 'Grimdark miniature battles',
    },
    {
      name: 'Catan',
      category: 'Board Game',
      players: '3-4',
      description: 'Resource management classic',
    },
    {
      name: 'Gloomhaven',
      category: 'Board Game',
      players: '1-4',
      description: 'Tactical dungeon crawler',
    },
  ];

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Games We Play</h1>
        <p className="text-muted-foreground">Explore our collection and systems</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="rpg">RPGs</TabsTrigger>
          <TabsTrigger value="board">Board Games</TabsTrigger>
          <TabsTrigger value="wargame">Wargames</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Card key={game.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{game.name}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{game.category}</Badge>
                    <span className="text-muted-foreground text-sm">{game.players} players</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add filtered views for other tabs */}
      </Tabs>
    </div>
  );
}
