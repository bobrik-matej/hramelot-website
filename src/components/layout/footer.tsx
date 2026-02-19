import React from "react";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-background py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="text-xl font-bold text-foreground">
                            Hramelot
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/guide" className="hover:text-foreground transition-colors">
                            Guide
                        </Link>
                        <Link href="/calendar" className="hover:text-foreground transition-colors">
                            Calendar
                        </Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;