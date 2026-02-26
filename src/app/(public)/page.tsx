import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
            <main className="max-w-3xl text-center">
                <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Hramelot Košice
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Your local home for board games and TTRPGs. Whether you're a pro or a beginner, there’s a seat for you.
                    Pick a game from our schedule or sign in to reserve your table.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    {/* Public Link */}
                    <Link
                        href="/calendar"
                        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        View Game Calendar
                    </Link>

                    {/* Members Link */}
                    <Link
                        href="/members"
                        className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                    >
                        Member Portal
                    </Link>
                </div>
            </main>
        </div>
    );
}