'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Hero() {
  const { user } = useAuth();
  const journeyLink = user ? '/activities' : '/login';

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <Image
        src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/HeroWebsite.png"
        alt="Ayurvedic background with herbs and spices"
        fill
        className="object-cover blur-[3px]"
        priority
      />
      <div className="absolute inset-0 bg-[rgba(232,213,175,0.45)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Bringing Ayurveda to Every Home
            </h1>
            <p className="mt-6 text-lg text-foreground/80 md:text-xl">
              With Love From India to the Whole World
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href={journeyLink}>Start Your Wellness Journey</Link>
              </Button>
              <Button asChild size="lg" className="text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/quiz">Take the free test now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
