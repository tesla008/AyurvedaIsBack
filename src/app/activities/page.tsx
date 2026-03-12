'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';

const allActivities = [
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Dincharya.png',
    title: 'Morning Rituals (Dinacharya)',
    description: 'Start your day with intention through practices like oil pulling (gandusha) and tongue scraping (jihwa prakshalana) to remove toxins.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Pranayama.png',
    title: 'Breathing Exercises (Pranayama)',
    description: 'Harness your life force (prana) with calming techniques like Nadi Shodhana (Alternate Nostril Breathing) and energizing ones like Bhastrika.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Herbalinfusions.png',
    title: 'Herbal Infusions',
    description: 'Discover the power of Ayurvedic herbs. Sip on ginger tea to aid digestion or tulsi tea to reduce stress.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Nidra.png',
    title: 'Sleep Hygiene (Nidra)',
    description: 'Cultivate restful sleep with evening routines. A warm bath, a gentle self-massage with oil, or a cup of warm milk can help.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/MindfulMovement.png',
    title: 'Mindful Movement (Yoga)',
    description: 'Practice yoga asanas tailored to your dosha. Gentle flows for Vata, cooling poses for Pitta, and dynamic sequences for Kapha.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Selfmassage.png',
    title: 'Self-Massage (Abhyanga)',
    description: 'Nourish your body and calm your nervous system with a daily self-massage using warm, dosha-appropriate oils.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Mindfuleating.png',
    title: 'Mindful Eating',
    description: 'Eat in a calm, settled environment without distractions. Chew your food thoroughly and savor each bite to improve digestion.'
  },
  {
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Meditation.png',
    title: 'Meditation (Dhyana)',
    description: 'Set aside time each day for meditation. Even 5-10 minutes can significantly reduce stress and improve mental clarity.'
  },
];

export default function ActivitiesPage() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="bg-background w-full">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              Embrace Ayurvedic Living
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Incorporate these simple yet profound activities into your daily routine to cultivate balance, health, and harmony.
            </p>
        </div>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-lg mx-auto mt-16"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {allActivities.map((activity, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                    <Card className="border-none bg-transparent shadow-none">
                        <CardContent className="flex flex-col items-center text-center p-6">
                            <Image
                                src={activity.imageUrl}
                                alt={activity.title}
                                width={500}
                                height={500}
                                className="w-full h-auto rounded-lg shadow-xl object-contain aspect-square"
                            />
                            <div className="mt-5">
                                <CardTitle className="font-headline text-2xl font-bold">{activity.title}</CardTitle>
                                <CardDescription className="mt-3 text-base">{activity.description}</CardDescription>
                            </div>
                        </CardContent>
                    </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
      <section className="w-full py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            Unlock the full Ayurvedic lifestyle experience.
          </h2>
          <Button 
            asChild 
            size="lg" 
            className="mt-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <Link href="/#sampoorna-plan">Buy the Sampoorna Plan</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
