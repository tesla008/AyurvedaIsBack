
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Ayurveda at Tips and help us build a platform that brings the ancient wisdom of Ayurveda into the future. We are looking for passionate individuals who believe in holistic wellness.',
  alternates: {
    canonical: '/careers',
  },
};

export default function CareersPage() {
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
            Careers
          </h1>
          <p className="mt-6 text-lg text-foreground/80">
            We are building a platform that brings Ayurveda into the future.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            Ayurveda at Tips is always looking for passionate individuals who believe in holistic wellness, technology-driven solutions, and meaningful impact.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            If you are excited about transforming how people approach health and well-being, we would love to hear from you.
          </p>
           <p className="mt-4 text-lg text-foreground/80">
            Contact us for opportunities and collaborations.
          </p>
        </div>
      </div>
    </div>
  );
}
