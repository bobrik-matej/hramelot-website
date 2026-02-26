"use client";

import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";
import {LogOut, Menu, Settings, User, X} from "lucide-react";
import {useState} from "react";
import {getUserRole} from "@/lib/auth-helpers";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const userRole = getUserRole(session);

    // Simplified top-level navigation
    const getTopLevelNav = () => {
        return [
            {href: "/calendar", label: "Calendar"},
            {href: "/guide", label: "Guide"},
            {href: "/lore", label: "Lore"},
            {href: "/about", label: "About"},
        ];
    };

    // Grouped member navigation for dropdown
    const getMemberDropdownItems = () => {
        if (userRole === 'PUBLIC') return null;

        return {
            general: [
                {href: "/members", label: "Portal", description: "Member home"},
                {href: "/members/events", label: "Events", description: "Browse & register"},
                {href: "/members/sessions", label: "Sessions", description: "Join game sessions"},
                {href: "/members/library", label: "Library", description: "Browse games"},
            ],
            member: userRole !== 'USER' ? [
                {href: "/members/reservations", label: "Book Tables", description: "Reserve space"},
            ] : [],
            master: ['MASTER', 'ADMIN'].includes(userRole) ? [
                {href: "/members/organize", label: "Organize", description: "Create & manage sessions"},
            ] : [],
        };
    };

    const topLevelNav = getTopLevelNav();
    const memberDropdown = getMemberDropdownItems();

    return (
        <nav className="bg-background border-b border-border sticky top-0 z-50">
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
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {/* Top-level links */}
                                {topLevelNav.map((item) => (
                                    <NavigationMenuItem key={item.href}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                            <Link href={item.href}>
                                                {item.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                {/* Members Dropdown (if authenticated) */}
                                {memberDropdown && (
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Members</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2">
                                                {memberDropdown.general.map((item) => (
                                                    <ListItem
                                                        key={item.href}
                                                        href={item.href}
                                                        title={item.label}
                                                    >
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                                {memberDropdown.member.map((item) => (
                                                    <ListItem
                                                        key={item.href}
                                                        href={item.href}
                                                        title={item.label}
                                                    >
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                                {memberDropdown.master.map((item) => (
                                                    <ListItem
                                                        key={item.href}
                                                        href={item.href}
                                                        title={item.label}
                                                    >
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                )}

                                {/* Admin link (no dropdown needed - single destination) */}
                                {userRole === 'ADMIN' && (
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                            <Link href="/admin">
                                                Admin
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* User Menu or Sign In */}
                        {status === "loading" ? (
                            <div className="h-9 w-9 animate-pulse bg-muted rounded-full ml-4" />
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                            <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/members/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    {userRole === 'ADMIN' && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin" className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                onClick={() => signIn("discord")}
                                className="ml-4"
                            >
                                Sign In
                            </Button>
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
                        {/* Public links */}
                        {topLevelNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Member links */}
                        {memberDropdown && (
                            <>
                                <div className="pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Members
                                </div>
                                {[...memberDropdown.general, ...memberDropdown.member, ...memberDropdown.master].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors pl-3"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </>
                        )}

                        {/* Admin link */}
                        {userRole === 'ADMIN' && (
                            <>
                                <div className="pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Admin
                                </div>
                                <Link
                                    href="/admin"
                                    className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors pl-3"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/members"
                                    className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors pl-3"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Members
                                </Link>
                            </>
                        )}

                        {/* Profile & Auth */}
                        {session && (
                            <>
                                <div className="pt-3 border-t border-border" />
                                <Link
                                    href="/members/profile"
                                    className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Profile
                                </Link>
                            </>
                        )}

                        <div className="pt-3 border-t border-border">
                            {session ? (
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left text-base font-medium text-destructive hover:text-destructive/90 transition-colors"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        signIn("discord");
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left text-base font-medium text-primary hover:text-primary/90 transition-colors"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Helper component for dropdown items
const ListItem = ({
                      className,
                      title,
                      children,
                      href,
                  }: {
    className?: string;
    title: string;
    children: React.ReactNode;
    href: string;
}) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
};

export default Navbar;