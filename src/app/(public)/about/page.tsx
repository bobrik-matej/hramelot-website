import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">About Hramelot</h1>
                <p className="text-muted-foreground">Košice&apos;s premier tabletop gaming community</p>
            </div>

            <Card>
                <CardContent className="pt-6 space-y-4">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                        <p className="text-muted-foreground">
                            Hramelot was founded to bring together tabletop gaming enthusiasts in Košice.
                            We provide a dedicated space for D&D campaigns, board game nights, and wargaming sessions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Multiple gaming tables with professional setups</li>
                            <li>Extensive board game and RPG library</li>
                            <li>Regular campaigns and one-shot sessions</li>
                            <li>Tournaments and community events</li>
                            <li>Beginner-friendly environment</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Community Values</h2>
                        <p className="text-muted-foreground">
                            Respect, inclusivity, and fun. Everyone is welcome at our table,
                            regardless of experience level or gaming preferences.
                        </p>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}