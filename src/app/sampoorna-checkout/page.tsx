
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout Sampoorna Plan',
  description: 'Complete your purchase for the Sampoorna Wellness Plan and unlock your complete Ayurvedic lifestyle journey.',
  alternates: {
    canonical: '/sampoorna-checkout',
  },
};

const benefits = [
  "Personalized Ayurvedic guidance",
  "One-to-one expert consultations",
  "Live wellness webinars",
  "Advanced lifestyle recommendations",
  "Priority access to new features"
];

export default function SampoornaCheckoutPage() {
  const whatsappLink = "https://chat.whatsapp.com/LWBNO2T7JZKBhpTpwbHJuG?mode=hqctcla";

  return (
    <div className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Sampoorna Wellness Plan
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Unlock your complete Ayurvedic lifestyle journey.
          </p>

          <Card className="mt-12 text-left p-6 sm:p-8">
            <CardContent className="p-0 space-y-8">
              <div>
                <h3 className="font-headline text-xl font-semibold mb-4">What you'll get:</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center bg-secondary p-6 rounded-lg">
                <p className="font-headline text-xl italic text-secondary-foreground">
                  "Your health is the most precious thing you have. Subscribe now."
                </p>
              </div>

              <div className="text-center space-y-4">
                <h3 className="font-headline text-xl font-semibold">Scan to complete your payment</h3>
                <div className="flex justify-center">
                  <Image
                    src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/PaymentQR.png"
                    alt="Payment QR Code"
                    width={250}
                    height={250}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          <Button asChild size="lg" className="mt-12">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Done with the payment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
