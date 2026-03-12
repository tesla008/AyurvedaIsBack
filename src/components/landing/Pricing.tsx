import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const freeFeatures = [
  "Daily Ayurvedic Tips",
  "Live Webinars",
];

const premiumFeatures = [
  "Personalized wellness plan",
  "One-to-one expert consultation",
  "Detailed dosha insights",
  "Lifestyle tracking",
  "Exclusive webinars",
  "Ayurvedic product recommendations"
];

export default function Pricing() {
  return (
    <section id="sampoorna-plan" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Sampoorna Plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start for free and upgrade when you're ready to unlock your full potential.
          </p>
        </div>
        <div className="mt-12 grid max-w-5xl mx-auto gap-8 md:grid-cols-2">
          <Card className="shadow-lg flex flex-col">
            <CardHeader className="text-center">
              <Image
                src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Freeplan.png"
                alt="Free Plan Icon"
                width={90}
                height={90}
                className="mx-auto mb-3 h-auto w-[90px] object-contain"
              />
              <CardTitle className="font-headline text-4xl font-bold">FREE</CardTitle>
              <CardDescription className="font-semibold text-primary">Limited Features</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">₹0</span>
              </div>
              <ul className="space-y-3">
                {freeFeatures.map(feature => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
                 {premiumFeatures.map(feature => (
                  <li key={feature} className="flex items-center text-muted-foreground">
                    <X className="h-5 w-5 text-destructive mr-3" />
                    <span className="line-through">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-xl border-2 border-primary relative overflow-hidden flex flex-col">
            <div className="bg-primary text-primary-foreground text-center py-2 font-semibold absolute top-0 w-full">Most Popular</div>
            <CardHeader className="text-center pt-12">
               <Image
                src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Sampoornaplan.png"
                alt="Sampoorna Plan Icon"
                width={90}
                height={90}
                className="mx-auto mb-3 h-auto w-[90px] object-contain"
              />
              <CardTitle className="font-headline text-2xl">Sampoorna Plan</CardTitle>
              <CardDescription>Your complete guide to holistic wellness.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">₹449</span>
                <span className="text-muted-foreground"> (per month)</span>
              </div>
              <ul className="space-y-3">
                 {freeFeatures.map(feature => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
                {premiumFeatures.map(feature => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                 <Link href="/login">Go Sampoorna</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
