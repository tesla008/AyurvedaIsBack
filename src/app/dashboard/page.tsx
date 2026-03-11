'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { getDailyTip } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Zap, Sun, Droplets } from 'lucide-radix';
import DoshaInfo from '@/components/landing/DoshaInfo';

const doshaDetails = {
    Vata: {
        icon: Zap,
        description: "You are governed by the principle of movement. You're likely creative, energetic, and lively."
    },
    Pitta: {
        icon: Sun,
        description: "You are governed by the principle of fire and water. You're likely intelligent, focused, and ambitious."
    },
    Kapha: {
        icon: Droplets,
        description: "You are governed by the principles of earth and water. You're likely calm, loving, and grounded."
    }
}

export default function DashboardPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tip, setTip] = useState('');
  const [tipLoading, setTipLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && userProfile && !userProfile.dosha) {
      router.push('/quiz');
    }
  }, [authLoading, userProfile, router]);

  useEffect(() => {
    if (userProfile?.dosha) {
      setTipLoading(true);
      getDailyTip(userProfile.dosha)
        .then(result => setTip(result.tip))
        .catch(console.error)
        .finally(() => setTipLoading(false));
    }
  }, [userProfile?.dosha]);
  
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, []);

  if (authLoading || !userProfile || !userProfile.dosha) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 text-primary" />
      </div>
    );
  }

  const CurrentDoshaIcon = doshaDetails[userProfile.dosha].icon;

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold">
              {greeting}, {userProfile.name || user?.displayName?.split(' ')[0]} 🌿
            </h1>
            <p className="text-xl text-muted-foreground">Welcome to your Ayurvedic Wellness Journey.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Daily Ayurvedic Tip</CardTitle>
                    <CardDescription>A personalized tip to balance your {userProfile.dosha} dosha.</CardDescription>
                </CardHeader>
                <CardContent>
                    {tipLoading ? (
                        <div className="flex items-center gap-4">
                            <Loader className="h-6 w-6 text-primary" />
                            <p>Generating your personalized tip...</p>
                        </div>
                    ) : (
                        <Alert className="bg-primary/5 border-primary/20">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          <AlertTitle className="font-headline text-lg text-primary">Today's Wisdom</AlertTitle>
                          <AlertDescription className="text-base text-foreground">
                            {tip}
                          </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Understanding Your Dosha</CardTitle>
                </CardHeader>
                <CardContent>
                    <DoshaInfo />
                </CardContent>
            </Card>

          </div>
          <div className="lg:col-span-1">
             <Card className="sticky top-24 shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        <CurrentDoshaIcon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl">You are {userProfile.dosha}</CardTitle>
                    <CardDescription className="text-base">
                        {doshaDetails[userProfile.dosha].description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">Explore the activities and diet recommendations tailored for your constitution to find balance and harmony.</p>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
