import type { Game } from '@/types/games';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  game: Game;
  children?: React.ReactNode;
}

export function GameCard({ game, children }: GameCardProps) {
  return (
    <Card>
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
        {children}
      </CardContent>
    </Card>
  );
}
