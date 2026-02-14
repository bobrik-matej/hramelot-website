"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Home, Calendar, LayoutDashboard, BookOpen, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "Home", href: "/", icon: <Home size={18} /> },
        { name: "Calendar", href: "/public/calendar", icon: <Calendar size={18} /> },
        { name: "Guide", href: "/public/guide", icon: <BookOpen size={18} /> },
    ];

    const memberLinks = [
        { name: "Dashboard", href: "/members/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "My Bookings", href: "/members/dashboard/reservations", icon: <Calendar size={18} /> },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/public" className="flex-shrink-0 flex items-center font-bold text-xl">
                            Hramelot
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {session && memberLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {status === "loading" ? (
                            <div className="h-8 w-20 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />
                        ) : session ? (
                            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {session.user?.name}
                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                >
                                    <LogOut size={16} className="mr-2" /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <LogIn size={16} className="mr-2" /> Member Login
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {[...navLinks, ...(session ? memberLinks : [])].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {!session && (
                            <button
                                onClick={() => signIn()}
                                className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-indigo-600 hover:bg-gray-50"
                            >
                                Login
                            </button>
                        )}
                        {session && (
                            <button
                                onClick={() => signOut()}
                                className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-gray-50"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;