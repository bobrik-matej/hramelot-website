import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function LibraryPage() {
    // TODO: Fetch from API
    const games = [
        { id: "1", name: "Gloomhaven", type: "Board Game", players: "1-4", available: true },
        { id: "2", name: "Wingspan", type: "Board Game", players: "1-5", available: true },
        { id: "3", name: "Twilight Imperium", type: "Board Game", players: "3-6", available: false },
    ];

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Game Library</h1>
                <p className="text-muted-foreground">Browse and borrow from our collection</p>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search games..." className="pl-10" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                    <Card key={game.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">{game.name}</CardTitle>
                                <Badge variant={game.available ? "default" : "secondary"}>
                                    {game.available ? "Available" : "Borrowed"}
                                </Badge>
                            </div>
                            <CardDescription>{game.type} • {game.players} players</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* TODO: Add borrow button for MEMBER+ */}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}