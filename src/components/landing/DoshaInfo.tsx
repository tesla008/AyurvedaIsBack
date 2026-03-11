import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Sun, Droplets } from 'lucide-react';

const doshas = [
  {
    name: 'Vata',
    icon: Zap,
    image: PlaceHolderImages.find(p => p.id === 'vata-dosha'),
    description: 'The energy of movement. Governs breathing, muscle movement, and nerve impulses.',
    details: {
      'Body Type': 'Lean, light frame, agile',
      'Emotional Tendencies': 'Creative, energetic, but prone to anxiety',
      'Diet Suggestions': 'Warm, moist, grounding foods',
      'Lifestyle Habits': 'Routine, warmth, and relaxation are key',
    },
  },
  {
    name: 'Pitta',
    icon: Sun,
    image: PlaceHolderImages.find(p => p.id === 'pitta-dosha'),
    description: 'The energy of digestion and metabolism. Governs body temperature and hormones.',
    details: {
      'Body Type': 'Medium build, muscular, sharp features',
      'Emotional Tendencies': 'Intelligent, focused, but can be irritable',
      'Diet Suggestions': 'Cooling, sweet, and non-spicy foods',
      'Lifestyle Habits': 'Moderation, coolness, and work-life balance',
    },
  },
  {
    name: 'Kapha',
    icon: Droplets,
    image: PlaceHolderImages.find(p => p.id === 'kapha-dosha'),
    description: 'The energy of lubrication and structure. Governs growth, immunity, and moisture.',
    details: {
      'Body Type': 'Solid build, strong, with soft features',
      'Emotional Tendencies': 'Calm, loving, but can tend towards lethargy',
      'Diet Suggestions': 'Light, dry, and warm foods with pungent spices',
      'Lifestyle Habits': 'Regular exercise, stimulation, and variety',
    },
  },
];

export default function DoshaInfo() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Understand Your Dosha
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          In Ayurveda, your unique mind-body constitution is known as your Dosha. Learn about the three Doshas to begin your wellness journey.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {doshas.map((dosha) => (
            <Card key={dosha.name} className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              {dosha.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={dosha.image.imageUrl}
                    alt={dosha.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={dosha.image.imageHint}
                  />
                </div>
              )}
              <CardHeader className="flex-row items-center gap-4">
                 <dosha.icon className="h-8 w-8 text-primary" />
                 <div>
                    <CardTitle className="font-headline text-2xl">{dosha.name}</CardTitle>
                    <CardDescription className="text-base">{dosha.description}</CardDescription>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  {Object.entries(dosha.details).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-semibold">{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
