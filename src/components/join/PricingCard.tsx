import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  bold?: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: PricingFeature[];
  highlighted?: boolean;
  children?: React.ReactNode;
}

export function PricingCard({ title, price, features, highlighted, children }: PricingCardProps) {
  return (
    <Card className={highlighted ? 'border-primary' : undefined}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-3xl font-bold">{price}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="text-primary mt-0.5 h-5 w-5" />
              <span className={`text-sm${feature.bold ? ' font-semibold' : ''}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        {children}
      </CardContent>
    </Card>
  );
}
