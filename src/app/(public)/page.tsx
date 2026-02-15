import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-black">
            <main className="max-w-3xl text-center">
                <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
                    Hramelot RPG Club
                </h1>
                <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Join our community of adventurers. Browse upcoming games on our public calendar
                    or log in as a member to reserve your next table.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    {/* Public Link */}
                    <Link
                        href="/calendar"
                        className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-hover hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        View Game Calendar
                    </Link>

                    {/* Members Link */}
                    <Link
                        href="/members/dashboard"
                        className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
                    >
                        Member Portal
                    </Link>
                </div>
            </main>
        </div>
    );
}