import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const doshas = [
  {
    name: 'Vata',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Vata.png',
    description: 'Energy of movement',
    details: {
      'Body': 'Lean and agile',
      'Mind': 'Creative and energetic',
      'Balance with': 'Warm food, routine, relaxation',
    },
  },
  {
    name: 'Pitta',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Pitta%20(1).png',
    description: 'Energy of digestion and metabolism',
    details: {
      'Body': 'Medium, strong build',
      'Mind': 'Focused and ambitious',
      'Balance with': 'Cooling foods and moderation',
    },
  },
  {
    name: 'Kapha',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Kapha.png',
    description: 'Energy of structure and stability',
    details: {
      'Body': 'Solid and strong',
      'Mind': 'Calm and compassionate',
      'Balance with': 'Activity and light foods',
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
                  alt={`${dosha.name} Dosha Illustration`}
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
        <div className="mt-12 text-center">
          <Button
            asChild
            className="h-auto rounded-[10px] bg-accent px-7 py-3.5 text-center text-base font-semibold text-accent-foreground transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-accent/90"
          >
            <Link href="/quiz">
              Take the free test now
            </Link>
          </Button>
          <p className="mt-2 text-sm font-medium text-foreground">
            Get <span className="font-semibold">20% off</span> after you get your dosha
          </p>
        </div>
      </div>
    </section>
  );
}
