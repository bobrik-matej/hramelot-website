"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

// Helper to determine user role from session
const getUserRole = (session: any): 'PUBLIC' | 'USER' | 'MEMBER' | 'MASTER' | 'ADMIN' => {
    if (!session?.user) return 'PUBLIC';

    // Assuming your session has a role property
    // Adjust this based on your actual session structure
    const role = session.user.role?.toUpperCase();

    if (role === 'ADMIN') return 'ADMIN';
    if (role === 'MASTER') return 'MASTER';
    if (role === 'MEMBER') return 'MEMBER';
    if (session.user) return 'USER';

    return 'PUBLIC';
};

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const userRole = getUserRole(session);

    // Define navigation items based on role
    const getNavItems = () => {
        const publicItems = [
            { href: "/", label: "Home" },
            { href: "/calendar", label: "Calendar" },
            { href: "/guide", label: "Guide" },
            { href: "/lore", label: "Lore" },
            { href: "/about", label: "About" },
        ];

        const userItems = [
            { href: "/members", label: "Members" },
            { href: "/members/events", label: "Events" },
            { href: "/members/sessions", label: "Sessions" },
            { href: "/members/library", label: "Library" },
        ];

        const memberItems = [
            { href: "/members/reservations", label: "Reservations" },
        ];

        const masterItems = [
            { href: "/members/organize", label: "Organize" },
        ];

        const adminItems = [
            { href: "/admin", label: "Admin" },
        ];

        // Build navigation based on role hierarchy
        switch (userRole) {
            case 'ADMIN':
                return [...publicItems.slice(1), ...userItems, ...memberItems, ...masterItems, ...adminItems];
            case 'MASTER':
                return [...publicItems.slice(1), ...userItems, ...memberItems, ...masterItems];
            case 'MEMBER':
                return [...publicItems.slice(1), ...userItems, ...memberItems];
            case 'USER':
                return [...publicItems.slice(1), ...userItems];
            case 'PUBLIC':
            default:
                return publicItems;
        }
    };

    const navItems = getNavItems();

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
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Profile Link for authenticated users */}
                        {session && (
                            <Link
                                href="/members/profile"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Profile
                            </Link>
                        )}

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
                                onClick={() => signIn("discord")}
                                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:bg-accent"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-border">
                    <div className="px-4 py-3 space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Profile Link for authenticated users */}
                        {session && (
                            <Link
                                href="/members/profile"
                                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </Link>
                        )}

                        {session ? (
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    signIn("discord");
                                    setIsOpen(false);
                                }}
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