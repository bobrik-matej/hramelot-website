"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Helper to determine user role from session
const getUserRole = (session: any): 'PUBLIC' | 'USER' | 'MEMBER' | 'MASTER' | 'ADMIN' => {
    if (!session?.user) return 'PUBLIC';

    const role = session.user.role?.toUpperCase();

    if (role === 'ADMIN') return 'ADMIN';
    if (role === 'MASTER') return 'MASTER';
    if (role === 'MEMBER') return 'MEMBER';
    if (session.user) return 'USER';

    return 'PUBLIC';
};

const Footer = () => {
    const { data: session } = useSession();
    const currentYear = new Date().getFullYear();
    const userRole = getUserRole(session);

    // Define footer sections based on role
    const getFooterSections = () => {
        const sections: { title: string; links: { href: string; label: string }[] }[] = [];

        // Public section - always visible
        sections.push({
            title: "Explore",
            links: [
                { href: "/calendar", label: "Calendar" },
                { href: "/events", label: "Events" },
                { href: "/games", label: "Games" },
                { href: "/lore", label: "Lore" },
            ],
        });

        sections.push({
            title: "About",
            links: [
                { href: "/about", label: "About Us" },
                { href: "/location", label: "Location" },
                { href: "/guide", label: "Guide" },
                { href: "/join", label: "Join Us" },
            ],
        });

        // Member section - for authenticated users
        if (userRole !== 'PUBLIC') {
            sections.push({
                title: "Members",
                links: [
                    { href: "/members", label: "Portal" },
                    { href: "/members/profile", label: "Profile" },
                    { href: "/members/events", label: "Events" },
                    { href: "/members/library", label: "Library" },
                ],
            });
        }

        // Add additional links for MEMBER+ roles
        if (['MEMBER', 'MASTER', 'ADMIN'].includes(userRole)) {
            sections.push({
                title: "Services",
                links: [
                    { href: "/members/reservations", label: "Book Tables" },
                    { href: "/members/sessions", label: "Sessions" },
                ],
            });
        }

        // Add organize section for MASTER+ roles
        if (['MASTER', 'ADMIN'].includes(userRole)) {
            const servicesSection = sections.find(s => s.title === "Services");
            if (servicesSection) {
                servicesSection.links.push({ href: "/members/organize", label: "Organize" });
            }
        }

        // Add admin section for ADMIN role
        if (userRole === 'ADMIN') {
            sections.push({
                title: "Admin",
                links: [
                    { href: "/admin", label: "Dashboard" },
                    { href: "/admin/members", label: "Members" },
                ],
            });
        }

        return sections;
    };

    const footerSections = getFooterSections();

    return (
        <footer className="w-full border-t border-border bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-xl font-bold text-foreground">
                            Hramelot
                        </Link>
                        <p className="mt-3 text-sm text-muted-foreground">
                            Your local home for board games and TTRPGs.
                        </p>
                    </div>

                    {/* Dynamic Navigation Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-foreground mb-3">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Hramelot Košice. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-foreground transition-colors">
                                Privacy
                            </Link>
                            <Link href="/about" className="hover:text-foreground transition-colors">
                                Terms
                            </Link>
                            <Link href="/location" className="hover:text-foreground transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;