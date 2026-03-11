'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getUserRole } from '@/lib/auth-helpers';

const Footer = () => {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();
  const userRole = getUserRole(session);

  // Simplified footer - max 4 columns
  const getFooterSections = () => {
    const sections: { title: string; links: { href: string; label: string }[] }[] = [];

    // Column 1: Discover (always visible)
    sections.push({
      title: 'Discover',
      links: [
        { href: '/calendar', label: 'Calendar' },
        { href: '/events', label: 'Events' },
        { href: '/games', label: 'Games' },
        { href: '/lore', label: 'Lore' },
      ],
    });

    // Column 2: Club (always visible)
    sections.push({
      title: 'Club',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/location', label: 'Find Us' },
        { href: '/guide', label: 'Guide' },
        { href: '/join', label: 'Join Us' },
      ],
    });

    // Column 3: Members (conditional)
    if (userRole !== 'PUBLIC') {
      const memberLinks = [
        { href: '/members', label: 'Portal' },
        { href: '/members/events', label: 'Events' },
        { href: '/members/library', label: 'Library' },
      ];

      if (['MEMBER', 'MASTER', 'ADMIN'].includes(userRole)) {
        memberLinks.push({ href: '/members/reservations', label: 'Book Tables' });
      }

      if (['MASTER', 'ADMIN'].includes(userRole)) {
        memberLinks.push({ href: '/members/organize', label: 'Organize' });
      }

      sections.push({
        title: 'Members',
        links: memberLinks,
      });
    }

    // Column 4: Admin (conditional)
    if (userRole === 'ADMIN') {
      sections.push({
        title: 'Admin',
        links: [
          { href: '/admin', label: 'Dashboard' },
          { href: '/admin/members', label: 'Members' },
        ],
      });
    }

    return sections;
  };

  const footerSections = getFooterSections();

  return (
    <footer className="border-border bg-background w-full border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-foreground text-xl font-bold">
              Hramelot
            </Link>
            <p className="text-muted-foreground mt-3 text-sm">
              Your local home for board games and TTRPGs.
            </p>
          </div>

          {/* Dynamic Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground mb-3 font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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
        <div className="border-border mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Hramelot Košice. All rights reserved.
            </p>
            <div className="text-muted-foreground flex gap-6 text-sm">
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
