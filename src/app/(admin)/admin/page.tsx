import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BookOpen, Calendar, Settings, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const adminSections = [
    {
      title: 'Members',
      icon: Users,
      href: '/admin/members',
      description: 'Manage users and roles',
    },
    {
      title: 'Content',
      icon: BookOpen,
      href: '/admin/content',
      description: 'Edit pages and lore',
    },
    {
      title: 'Reservations',
      icon: Calendar,
      href: '/admin/reservations',
      description: 'Override bookings',
    },
    {
      title: 'Analytics',
      icon: BarChart,
      href: '/admin/analytics',
      description: 'Club statistics',
    },
    { title: 'Moderation', icon: Shield, href: '/admin/moderation', description: 'Handle reports' },
    {
      title: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      description: 'System configuration',
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Control Panel</h1>
        <p className="text-muted-foreground">Full system management access</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
