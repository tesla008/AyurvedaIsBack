
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission',
  description: 'Learn about the mission of Ayurveda at Tips to make holistic wellness simple, accessible, and personalized by combining ancient Ayurvedic principles with modern technology.',
  alternates: {
    canonical: '/mission',
  },
};

export default function MissionPage() {
  return (
    <div className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
            alt="Ayurveda at Tips Logo"
            width={120}
            height={120}
            className="mx-auto mb-8 h-auto w-[120px] object-contain"
          />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Our Mission
          </h1>
          <p className="mt-6 text-lg text-foreground/80">
            Ayurveda at Tips aims to bring the wisdom of Ayurveda into the daily lives of people across the world.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            Our mission is to make holistic wellness simple, accessible, and personalized. By combining ancient Ayurvedic principles with modern technology, we help individuals understand their body type, adopt healthy routines, and live a more balanced life.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            Through personalized dosha insights, expert guidance, and practical lifestyle practices, we hope to inspire a new generation to embrace Ayurveda as a way of life.
          </p>
        </div>
      </div>
    </div>
  );
}
