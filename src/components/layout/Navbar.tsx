"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/public" className="font-bold text-xl text-gray-900 dark:text-white">
                            Hramelot
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link href="/public" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            Home
                        </Link>
                        <Link href="/calendar" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            Calendar
                        </Link>
                        <Link href="/guide" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            Guide
                        </Link>

                        {/* Auth Button */}
                        {status === "loading" ? (
                            <div className="h-9 w-20 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />
                        ) : session ? (
                            <button
                                onClick={() => signOut()}
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden border-t border-gray-200 dark:border-gray-800">
                    <div className="px-4 py-3 space-y-3">
                        <Link
                            href="/public"
                            className="block text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/calendar"
                            className="block text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Calendar
                        </Link>
                        <Link
                            href="/guide"
                            className="block text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Guide
                        </Link>

                        {session ? (
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    signIn();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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