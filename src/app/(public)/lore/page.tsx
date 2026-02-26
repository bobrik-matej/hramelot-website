import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Lore | Hramelot Košice',
  description:
    'Explore the legends and history of Hramelot – the factions, locations, and tales that define our tabletop gaming community.',
};

export default function LorePage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Hramelot Lore</h1>
        <p className="text-muted-foreground">The history and legends of our realm</p>
      </div>

      <Card>
        <CardContent>
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="factions">Factions</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="legends">Legends</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Founding of Hramelot</h3>
                <p className="text-muted-foreground">
                  In the year 2024, a group of adventurers sought refuge from the mundane world.
                  They discovered an ancient hall, long forgotten, and breathed new life into its
                  stone walls. This place became known as Hramelot - a sanctuary for those who seek
                  adventure, camaraderie, and the roll of dice.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Great Campaigns</h3>
                <p className="text-muted-foreground">
                  Since its founding, Hramelot has witnessed countless campaigns. From the defeat of
                  the Lich King Azarok to the liberation of the Feywild, each tale adds to our
                  growing legacy.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="factions" className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Silver Dice Guild</h3>
                <p className="text-muted-foreground">
                  Master strategists and veterans who guide new adventurers through their first
                  quests.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Dungeon Masters&apos; Circle</h3>
                <p className="text-muted-foreground">
                  The keepers of stories, weavers of fate, and architects of worlds.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Lorekeeper Society</h3>
                <p className="text-muted-foreground">
                  Chroniclers who document every session, preserving our shared history.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="locations" className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Main Hall</h3>
                <p className="text-muted-foreground">
                  The heart of Hramelot, where most campaigns begin. Features a grand table that has
                  seen countless battles.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Dragon&apos;s Den</h3>
                <p className="text-muted-foreground">
                  An intimate chamber for smaller parties, decorated with draconic memorabilia.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Library of Infinite Pages</h3>
                <p className="text-muted-foreground">
                  Home to our collection of rulebooks, campaign guides, and homebrew materials.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="legends" className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Legendary Nat 20</h3>
                <p className="text-muted-foreground">
                  Tales speak of a player who rolled three natural 20s in a row during a final boss
                  battle, changing the course of an entire campaign. The dice used that night are
                  now enshrined in our trophy case.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">The Curse of the Missing Dice</h3>
                <p className="text-muted-foreground">
                  Every veteran knows: dice that roll well have a habit of disappearing. Some say
                  they&apos;re claimed by the Dice Goblin, a mischievous spirit that haunts all
                  gaming spaces.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
