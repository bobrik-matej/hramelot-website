import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: "Visitor's Guide | Hramelot Košice",
  description:
    'Everything you need to know before visiting Hramelot – what to bring, house rules, membership, hours, and how to get here.',
};

export default function GuidePage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Visitor&apos;s Guide</h1>
        <p className="text-muted-foreground">Everything you need to know about Hramelot</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Hramelot?</AccordionTrigger>
              <AccordionContent>
                Hramelot is a dedicated D&amp;D community space where adventurers gather to embark
                on epic quests. Our facility features multiple gaming areas, a library of rulebooks,
                and a welcoming community.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I become a member?</AccordionTrigger>
              <AccordionContent>
                Contact us through our registration form. Membership includes access to private
                sessions, table reservations, and exclusive events. New members are always welcome!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What should I bring to my first session?</AccordionTrigger>
              <AccordionContent>
                Bring your character sheet, dice (or use our digital tools), and enthusiasm! We
                provide maps, miniatures, and reference materials. Snacks and drinks are allowed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Location &amp; Hours</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  <strong>Address:</strong> 123 Dragon Lane, Fantasy City
                </p>
                <p className="mb-2">
                  <strong>Hours:</strong>
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Tuesday–Thursday: 17:00 – 23:00</li>
                  <li>Friday–Saturday: 17:00 – 01:00</li>
                  <li>Sunday: 14:00 – 22:00</li>
                  <li>Monday: Closed</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>House Rules</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>Respect all players and DMs</li>
                  <li>No metagaming or rules lawyering</li>
                  <li>Keep the space clean</li>
                  <li>Mobile phones on silent during sessions</li>
                  <li>Have fun and roll well!</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
