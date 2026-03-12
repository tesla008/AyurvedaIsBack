import {
  ShieldCheck,
  Leaf,
  Users,
  Activity,
  Video,
  ShoppingBag,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    icon: ShieldCheck,
    title: 'Personalized Dosha Detection',
    description: 'Discover your Ayurvedic body constitution and unlock personalized wellness insights.',
  },
  {
    icon: Leaf,
    title: 'Daily Ayurvedic Tips',
    description: 'Receive simple daily tips based on your dosha to support balance and wellbeing.',
  },
  {
    icon: Users,
    title: 'Expert Consultations',
    description: 'Connect with experienced Ayurvedic doctors for personalized health guidance.',
  },
  {
    icon: Activity,
    title: 'Ayurveda Lifestyle Activities',
    description: 'Practice daily rituals, yoga, breathing techniques, and mindful routines.',
  },
  {
    icon: Video,
    title: 'Live Wellness Webinars',
    description: 'Join interactive sessions with Ayurvedic experts and wellness practitioners.',
  },
  {
    icon: ShoppingBag,
    title: 'Personalized Ayurvedic Products',
    description: 'Dosha-based Ayurvedic products designed for your unique body constitution.',
    badge: 'Coming Soon',
  },
];

export default function Slideshow() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-center font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              A Personalized Wellness Ecosystem
            </h2>
            <p className="mx-auto mt-4 max-w-[650px] text-center text-lg text-muted-foreground">
              Ancient Ayurvedic wisdom meets modern technology to guide your daily wellness journey.
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col items-center rounded-xl bg-card p-7 text-center shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1.5"
            >
              <CardHeader className="p-0">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col p-0">
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                {feature.badge && (
                  <Badge
                    variant="secondary"
                    className="mx-auto mt-2 px-2 py-1 text-xs font-semibold"
                  >
                    {feature.badge}
                  </Badge>
                )}
                <CardDescription className="mt-2 text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
            <Button asChild size="lg">
                <Link href="/dosha-quiz">Take the Free Dosha Test</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
