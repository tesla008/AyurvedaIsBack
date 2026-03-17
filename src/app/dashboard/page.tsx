'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { getDailyTip } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Zap, Sun, Droplets, HeartPulse, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const doshaDetails = {
    Vata: {
        icon: Zap,
        description: "You are governed by the principle of movement. You're likely creative, energetic, and lively.",
        insights: "Focus on grounding routines, warm foods, and maintaining a regular schedule to stay balanced."
    },
    Pitta: {
        icon: Sun,
        description: "You are governed by the principle of fire and water. You're likely intelligent, focused, and ambitious.",
        insights: "Incorporate cooling practices and moderation in your daily life. Avoid excess heat and stressful situations."
    },
    Kapha: {
        icon: Droplets,
        description: "You are governed by the principles of earth and water. You're likely calm, loving, and grounded.",
        insights: "Stay active and energized with stimulating routines. Prefer light, warm foods to invigorate your system."
    }
}

export default function DashboardPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tip, setTip] = useState('');
  const [tipLoading, setTipLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.dosha) {
      setTipLoading(true);
      getDailyTip(userProfile.dosha)
        .then(result => setTip(result.tip))
        .catch(console.error)
        .finally(() => setTipLoading(false));
    }
  }, [userProfile?.dosha]);

  if (authLoading || !userProfile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!userProfile.dosha) {
    return (
        <AuthGuard>
            <div className="container mx-auto px-4 py-16 md:px-6 text-center">
                <h2 className="font-headline text-3xl font-bold">Unlock Your Personalized Dashboard</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Take the dosha test to unlock your dashboard and discover personalized wellness insights.
                </p>
                <Button onClick={() => router.push('/quiz')} size="lg" className="mt-8">
                    Take the free test now
                </Button>
            </div>
        </AuthGuard>
    );
  }

  const CurrentDoshaIcon = doshaDetails[userProfile.dosha].icon;
  const creationDate = userProfile.createdAt ? format(new Date(userProfile.createdAt.seconds * 1000), 'PPP') : 'N/A';

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold">
              Namaste, {userProfile.name || user?.displayName?.split(' ')[0]} 🌿
            </h1>
            <p className="text-xl text-muted-foreground">Your personalized Ayurvedic wellness journey begins here.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Today's Ayurvedic Recommendation</CardTitle>
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
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><HeartPulse/> Personalized Insights</CardTitle>
                    <CardDescription>Guidance for your {userProfile.dosha} constitution.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-base">{doshaDetails[userProfile.dosha].insights}</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-3 gap-4">
                    <Button asChild variant="outline" size="lg"><Link href="/activities">Explore Activities</Link></Button>
                    <Button asChild variant="outline" size="lg" disabled><Link href="#">Book Consultation</Link></Button>
                    <Button asChild size="lg"><Link href="/#sampoorna-plan">Upgrade to Sampoorna</Link></Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><User/> Profile Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Dominant Dosha:</strong> {userProfile.dosha}</p>
                    <p><strong>Member Since:</strong> {creationDate}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild><Link href="/profile">Edit Profile <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                </CardFooter>
            </Card>

          </div>
          <div className="lg:col-span-1">
             <Card className="sticky top-24 shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        <CurrentDoshaIcon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl">Your Prakriti: {userProfile.dosha}</CardTitle>
                    <CardDescription className="text-base">
                        {doshaDetails[userProfile.dosha].description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">Understanding your dosha is the first step toward balanced health. Explore activities and diet recommendations tailored for your constitution.</p>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
