import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "Daily Ayurvedic tips",
  "Live webinars access",
  "Basic Dosha insights"
];

const premiumFeatures = [
  "Personalized wellness plan",
  "Expert consultation access",
  "Detailed dosha insights",
  "Lifestyle tracking tools",
  "Exclusive premium webinars",
  "Ayurvedic product recommendations"
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Wellness Path
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start for free and upgrade when you're ready to unlock your full potential.
          </p>
        </div>
        <div className="mt-12 grid max-w-5xl mx-auto gap-8 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Free Plan</CardTitle>
              <CardDescription>Begin your journey into Ayurveda today.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                {freeFeatures.map(feature => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
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
          <Card className="shadow-xl border-2 border-primary relative overflow-hidden">
            <div className="bg-primary text-primary-foreground text-center py-2 font-semibold absolute top-0 w-full">Most Popular</div>
            <CardHeader className="text-center pt-12">
              <CardTitle className="font-headline text-2xl">Sampoorna Plan</CardTitle>
              <CardDescription>Your complete guide to holistic wellness.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
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
