import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/public" className="text-xl font-bold text-gray-900 dark:text-white">
                            Hramelot
                        </Link>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                        <Link href="/guide" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Guide
                        </Link>
                        <Link href="/calendar" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Calendar
                        </Link>
                        <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;