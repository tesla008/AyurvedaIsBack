import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Sunrise, Wind, Sprout, Moon } from 'lucide-react';
import Link from "next/link";
import { Button } from "../ui/button";

const activities = [
  {
    icon: Sunrise,
    title: 'Morning Rituals',
    description: 'Start your day with intention through practices like oil pulling and tongue scraping.'
  },
  {
    icon: Wind,
    title: 'Breathing Exercises',
    description: 'Harness your life force (prana) with calming and energizing pranayama techniques.'
  },
  {
    icon: Sprout,
    title: 'Herbal Infusions',
    description: 'Discover the power of Ayurvedic herbs with simple, nourishing drink recipes.'
  },
  {
    icon: Moon,
    title: 'Sleep Hygiene',
    description: 'Cultivate restful sleep with evening routines that soothe the mind and body.'
  }
];

export default function Activities() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Daily Ayurvedic Activities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Integrate the wisdom of Ayurveda into your daily life with these simple yet powerful practices for holistic well-being.
            </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <Card key={activity.title} className="p-6 text-center shadow-md transition-shadow hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <activity.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="font-headline text-xl mb-2">{activity.title}</CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/activities">Explore All Activities</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
