import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function JoinPage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Become a Member</h1>
        <p className="text-muted-foreground">Join the Hramelot community</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>USER</CardTitle>
            <p className="text-3xl font-bold">Free</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Register for public events</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Browse game library</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Join open sessions</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/api/auth/signin">Sign Up with Discord</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>MEMBER</CardTitle>
            <p className="text-3xl font-bold">€X/month</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">All USER benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm font-semibold">Book tables</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Borrow games</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Member-only resources</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Discounts on events</span>
              </li>
            </ul>
            <Button className="w-full">Become a Member</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MASTER</CardTitle>
            <p className="text-3xl font-bold">Earned</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">All MEMBER benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm font-semibold">Priority table booking</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Create sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5" />
                <span className="text-sm">Campaign management tools</span>
              </li>
            </ul>
            <p className="text-muted-foreground text-xs">Run 2+ sessions per month to qualify</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
