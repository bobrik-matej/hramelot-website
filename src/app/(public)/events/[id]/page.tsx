import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Placeholder - replace with actual DB query
    const event = {
        id,
        title: "D&D Beginner Night",
        description: "Learn the basics of D&D in a welcoming environment. No experience needed!",
        longDescription: "Join us for an evening dedicated to new players. We'll cover character creation, basic rules, and run a short adventure. All materials provided.",
        date: "2026-03-15",
        time: "18:00",
        duration: "3 hours",
        slots: 6,
        registered: 4,
        type: "workshop",
        table: "Main Hall",
        requirements: "None - beginners welcome",
    };

    if (!event) return notFound();

    return (
        <div className="container mx-auto py-8 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-3xl">{event.title}</CardTitle>
                            <CardDescription className="mt-2 text-base">{event.description}</CardDescription>
                        </div>
                        <Badge>{event.type}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.registered}/{event.slots} spots taken</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{event.table}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">About This Event</h3>
                        <p className="text-muted-foreground">{event.longDescription}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Requirements</h3>
                        <p className="text-muted-foreground">{event.requirements}</p>
                    </div>

                    <Button size="lg" className="w-full md:w-auto">
                        Register for Event
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}