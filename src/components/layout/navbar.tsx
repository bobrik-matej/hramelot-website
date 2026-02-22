"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-xl text-foreground">
                            <Image
                                src="/images/hramelot_studios.png"
                                alt="Hramelot Studios Logo"
                                width={150}
                                height={40}
                                priority
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/calendar" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Calendar
                        </Link>
                        <Link href="/guide" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Guide
                        </Link>
                        <Link href="/lore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Lore
                        </Link>

                        {/* Auth Button */}
                        {status === "loading" ? (
                            <div className="h-9 w-20 animate-pulse bg-muted rounded" />
                        ) : session ? (
                            <button
                                onClick={() => signOut()}
                                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:bg-accent"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden border-t border-border">
                    <div className="px-4 py-3 space-y-3">
                        <Link
                            href="/"
                            className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/calendar"
                            className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Calendar
                        </Link>
                        <Link
                            href="/guide"
                            className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Guide
                        </Link>
                        <Link
                            href="/lore"
                            className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Lore
                        </Link>

                        {session ? (
                            <button
                                onClick={() => { signOut(); setIsOpen(false); }}
                                className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => { signIn(); setIsOpen(false); }}
                                className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;