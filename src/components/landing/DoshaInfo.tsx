import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const doshas = [
  {
    name: 'Vata',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Vata.png',
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
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Pitta%20(1).png',
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
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Kapha.png',
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
              <CardHeader className="text-center">
                <Image
                  src={dosha.imageUrl}
                  alt={`${dosha.name} dosha illustration`}
                  width={250}
                  height={250}
                  className="w-[70%] h-auto mx-auto mb-4 object-contain rounded-lg aspect-square"
                />
                <CardTitle className="font-headline text-2xl">{dosha.name}</CardTitle>
                <CardDescription className="text-base mt-2">{dosha.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
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
