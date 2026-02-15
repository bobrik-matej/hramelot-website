import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
    // Placeholder: Replace with actual events data
    const events = [
        { id: 1, title: "Weekly Session", date: "2026-02-20", time: "18:00", type: "session" },
        { id: 2, title: "Tournament Night", date: "2026-02-22", time: "19:00", type: "event" },
        { id: 3, title: "Campaign Finale", date: "2026-02-27", time: "18:00", type: "session" },
    ];

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Event Calendar</CardTitle>
                    <CardDescription>Upcoming sessions and events at Hramelot</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                                <div>
                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}
                                    </p>
                                </div>
                                <Badge variant={event.type === "session" ? "default" : "secondary"}>
                                    {event.type}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}