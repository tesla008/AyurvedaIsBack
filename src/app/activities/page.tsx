import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { Sunrise, Wind, Sprout, Moon, Footprints, Droplets, Utensils, Heart } from 'lucide-react';

const allActivities = [
  {
    icon: Sunrise,
    title: 'Morning Rituals (Dinacharya)',
    description: 'Start your day with intention through practices like oil pulling (gandusha) and tongue scraping (jihwa prakshalana) to remove toxins.'
  },
  {
    icon: Wind,
    title: 'Breathing Exercises (Pranayama)',
    description: 'Harness your life force (prana) with calming techniques like Nadi Shodhana (Alternate Nostril Breathing) and energizing ones like Bhastrika.'
  },
  {
    icon: Sprout,
    title: 'Herbal Infusions',
    description: 'Discover the power of Ayurvedic herbs. Sip on ginger tea to aid digestion or tulsi tea to reduce stress.'
  },
  {
    icon: Moon,
    title: 'Sleep Hygiene (Nidra)',
    description: 'Cultivate restful sleep with evening routines. A warm bath, a gentle self-massage with oil, or a cup of warm milk can help.'
  },
  {
    icon: Footprints,
    title: 'Mindful Movement (Yoga)',
    description: 'Practice yoga asanas tailored to your dosha. Gentle flows for Vata, cooling poses for Pitta, and dynamic sequences for Kapha.'
  },
  {
    icon: Droplets,
    title: 'Self-Massage (Abhyanga)',
    description: 'Nourish your body and calm your nervous system with a daily self-massage using warm, dosha-appropriate oils.'
  },
  {
    icon: Utensils,
    title: 'Mindful Eating',
    description: 'Eat in a calm, settled environment without distractions. Chew your food thoroughly and savor each bite to improve digestion.'
  },
  {
    icon: Heart,
    title: 'Meditation (Dhyana)',
    description: 'Set aside time each day for meditation. Even 5-10 minutes can significantly reduce stress and improve mental clarity.'
  },
];

export default function ActivitiesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              Embrace Ayurvedic Living
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Incorporate these simple yet profound activities into your daily routine to cultivate balance, health, and harmony.
            </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allActivities.map((activity) => (
            <Card key={activity.title} className="flex flex-col text-center shadow-md transition-shadow hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <activity.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-headline text-xl">{activity.title}</CardTitle>
              </CardHeader>
              <CardDescription className="p-6 pt-0 flex-grow">{activity.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
