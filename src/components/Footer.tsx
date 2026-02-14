import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Hramelot
                        </Link>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            © {currentYear} Hramelot. All rights reserved.
                        </p>
                    </div>

                    <nav className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Link href="/public/guide" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Guide
                        </Link>
                        <Link href="/public/calendar" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Calendar
                        </Link>
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Privacy
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                        <Link href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="mailto:hello@example.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;