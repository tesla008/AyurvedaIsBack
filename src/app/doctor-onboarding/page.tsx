
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Onboarding',
  description: 'Learn how to partner with Ayurveda at Tips as an expert Ayurvedic doctor. View our onboarding presentation and join our network.',
  alternates: {
    canonical: '/doctor-onboarding',
  },
};

export default function DoctorOnboardingPage() {
  const pdfUrl = "https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/AyurvedaAtTipsDoctors.pdf";

  return (
    <div className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Image
            src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
            alt="Ayurveda at Tips Logo"
            width={120}
            height={120}
            className="mx-auto mb-8 h-auto w-[120px] object-contain"
          />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            Doctor Onboarding
          </h1>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
              className="w-full h-[500px] md:h-[800px]"
              title="Doctor Onboarding Presentation"
            ></iframe>
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link href={pdfUrl} download="AyurvedaAtTipsDoctors.pdf">
              Download the Presentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
