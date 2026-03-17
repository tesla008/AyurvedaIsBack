'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Flame, Wind, Droplet, Clock, Star, Target } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { format, isToday, isYesterday } from 'date-fns';

const allActivities = [
  {
    id: 'dinacharya',
    title: 'Morning Rituals (Dinacharya)',
    description: 'Start your day with intention through practices like oil pulling and tongue scraping to remove toxins.',
    duration: 10,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Dincharya.png',
    doshas: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    id: 'pranayama',
    title: 'Breathing Exercises (Pranayama)',
    description: 'Harness your life force (prana) with calming techniques like Nadi Shodhana.',
    duration: 10,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Pranayama.png',
    doshas: ['Vata', 'Pitta'],
  },
  {
    id: 'herbal_infusions',
    title: 'Herbal Infusions',
    description: 'Sip on ginger tea to aid digestion or tulsi tea to reduce stress.',
    duration: 5,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Herbalinfusions.png',
    doshas: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    id: 'nidra',
    title: 'Sleep Hygiene (Nidra)',
    description: 'Cultivate restful sleep with evening routines like a warm bath or gentle self-massage.',
    duration: 15,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Nidra.png',
    doshas: ['Vata', 'Pitta'],
  },
  {
    id: 'yoga',
    title: 'Mindful Movement (Yoga)',
    description: 'Practice yoga asanas tailored to your dosha. Gentle flows for Vata, cooling poses for Pitta.',
    duration: 20,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/MindfulMovement.png',
    doshas: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    id: 'abhyanga',
    title: 'Self-Massage (Abhyanga)',
    description: 'Nourish your body and calm your nervous system with a daily self-massage using warm oils.',
    duration: 15,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Selfmassage.png',
    doshas: ['Vata'],
  },
  {
    id: 'mindful_eating',
    title: 'Mindful Eating',
    description: 'Eat in a calm environment without distractions. Chew thoroughly and savor each bite.',
    duration: 15,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Mindfuleating.png',
    doshas: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    id: 'meditation',
    title: 'Meditation (Dhyana)',
    description: 'Set aside 5-10 minutes each day to reduce stress and improve mental clarity.',
    duration: 10,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Meditation.png',
    doshas: ['Vata', 'Pitta'],
  },
  {
    id: 'digital_detox',
    title: 'Digital Detox',
    description: 'Disconnect from screens to reduce mental chatter and eye strain. Focus on the present.',
    duration: 15,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Nidra.png',
    doshas: ['Vata', 'Pitta'],
  },
  {
    id: 'gratitude_journaling',
    title: 'Gratitude Journaling',
    description: 'Write down three things you are grateful for to cultivate positivity and contentment.',
    duration: 5,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Herbalinfusions.png',
    doshas: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    id: 'sun_exposure',
    title: 'Sun Exposure',
    description: 'Spend time in the morning sun to boost Vitamin D and regulate your circadian rhythm.',
    duration: 10,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Dincharya.png',
    doshas: ['Kapha'],
  },
  {
    id: 'walking_meditation',
    title: 'Walking Meditation',
    description: 'Walk slowly and mindfully, paying attention to the sensation of your feet on the ground.',
    duration: 15,
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/MindfulMovement.png',
    doshas: ['Vata', 'Kapha'],
  },
];

type Activity = typeof allActivities[0];

const doshaIcons = {
    Vata: Wind,
    Pitta: Flame,
    Kapha: Droplet
}

function ActivityTimer({ activity, onComplete, onOpenChange }: { activity: Activity, onComplete: () => void, onOpenChange: (open: boolean) => void }) {
    const totalSeconds = activity.duration * 60;
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [isPaused, setIsPaused] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isPaused || isFinished) return;

        if (secondsLeft <= 0) {
            setIsFinished(true);
            onComplete();
            const timerId = setTimeout(() => onOpenChange(false), 2000);
            return () => clearTimeout(timerId);
        }

        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, isPaused, isFinished, onComplete, onOpenChange]);

    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-headline">{activity.title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-6 space-y-6">
                    {isFinished ? (
                        <div className="flex flex-col items-center text-center space-y-4">
                            <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
                            <p className="text-xl font-semibold">Well done!</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-6xl font-bold font-mono text-primary">
                                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                            </div>
                            <Progress value={progress} className="w-full h-3" />
                            <div className="flex space-x-4">
                                <Button onClick={() => setIsPaused(!isPaused)} variant="outline">
                                    {isPaused ? 'Resume' : 'Pause'}
                                </Button>
                                 <Button onClick={() => setSecondsLeft(0)} variant="secondary">
                                    Finish
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ActivityCard({ activity, onStart, isCompleted }: { activity: Activity, onStart: (activity: Activity) => void, isCompleted: boolean }) {
  return (
    <Card className={`flex flex-col transition-shadow hover:shadow-lg ${isCompleted ? 'bg-primary/5 border-primary/20' : ''}`}>
      <CardHeader>
        <Image
          src={activity.imageUrl}
          alt={activity.title}
          width={400}
          height={400}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <CardTitle className="font-headline text-xl pt-4">{activity.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4"/>
            <span>{activity.duration} min</span>
        </div>
        <Button onClick={() => onStart(activity)} disabled={isCompleted} size="sm">
            {isCompleted && <CheckCircle className="mr-2" />}
            {isCompleted ? 'Done!' : 'Start'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ActivitiesPage() {
    const { user, userProfile } = useAuth();
    const [completedToday, setCompletedToday] = useState<string[]>([]);
    const [streak, setStreak] = useState(0);
    const [activityForTimer, setActivityForTimer] = useState<Activity | null>(null);

    const todayStr = format(new Date(), 'yyyy-MM-dd');

    useEffect(() => {
        if (!user) return;

        const fetchActivityData = async () => {
            const userRef = doc(db, 'users', user.uid);
            const dailyLogRef = doc(db, 'users', user.uid, 'activityLog', todayStr);
            
            const [userSnap, dailyLogSnap] = await Promise.all([getDoc(userRef), getDoc(dailyLogRef)]);

            if (dailyLogSnap.exists()) {
                setCompletedToday(dailyLogSnap.data().completedActivities || []);
            }

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const lastDate = userData.lastActiveDate?.toDate();
                let currentStreak = userData.streakCount || 0;
                if (lastDate && !isToday(lastDate) && !isYesterday(lastDate)) {
                    currentStreak = 0;
                }
                setStreak(currentStreak);
            }
        };

        fetchActivityData();
    }, [user, todayStr]);

    const handleCompleteActivity = useCallback(async () => {
        if (!user || !activityForTimer) return;
    
        const wasAlreadyCompleted = completedToday.includes(activityForTimer.id);
        const newCompleted = [...new Set([...completedToday, activityForTimer.id])];
        setCompletedToday(newCompleted);
    
        const dailyLogRef = doc(db, 'users', user.uid, 'activityLog', todayStr);
        await setDoc(dailyLogRef, {
            completedActivities: newCompleted,
            date: serverTimestamp()
        }, { merge: true });
    
        const userRef = doc(db, 'users', user.uid);

        if (!wasAlreadyCompleted && newCompleted.length === 1) { // First activity of the day
            const userSnap = await getDoc(userRef);
            let newStreak = 1;
            if (userSnap.exists()) {
                const userData = userSnap.data();
                const lastDate = userData.lastActiveDate?.toDate();
                if (lastDate && isYesterday(lastDate)) {
                    newStreak = (userData.streakCount || 0) + 1;
                }
            }
            setStreak(newStreak);
            await setDoc(userRef, { streakCount: newStreak, lastActiveDate: serverTimestamp() }, { merge: true });
        } else { // Not the first activity, or already completed, just update date
            await setDoc(userRef, { lastActiveDate: serverTimestamp() }, { merge: true });
        }
    
        setActivityForTimer(null);
    }, [user, activityForTimer, completedToday, todayStr]);

    const recommendedActivities = useMemo(() => {
        if (!userProfile?.dosha) return [];
        return allActivities.filter(act => act.doshas.includes(userProfile.dosha!));
    }, [userProfile?.dosha]);

    const milestones = useMemo(() => {
        const completedCount = completedToday.length;
        const totalActivities = allActivities.length;
        return [
            { name: 'Beginner', goal: 1, achieved: completedCount >= 1 },
            { name: 'Consistent', goal: 3, achieved: completedCount >= 3 },
            { name: 'Dedicated', goal: 5, achieved: completedCount >= 5 },
            { name: 'Balanced Day', goal: totalActivities, achieved: completedCount >= totalActivities },
        ];
    }, [completedToday.length]);

    const DoshaIcon = userProfile?.dosha ? doshaIcons[userProfile.dosha] : null;

    return (
        <AuthGuard>
            {activityForTimer && (
                <ActivityTimer
                    activity={activityForTimer}
                    onComplete={handleCompleteActivity}
                    onOpenChange={() => setActivityForTimer(null)}
                />
            )}
            <div className="bg-background w-full">
                <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                    <div className="mx-auto max-w-3xl text-center mb-12">
                        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                            Daily Wellness Activities
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Cultivate balance and harmony by integrating these simple yet profound Ayurvedic practices into your daily routine.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mb-12">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
                                <Target className="w-4 h-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{completedToday.length} / {allActivities.length}</div>
                                <p className="text-xs text-muted-foreground">activities completed</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                                <Flame className="w-4 h-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{streak} {streak === 1 ? 'Day' : 'Days'}</div>
                                <p className="text-xs text-muted-foreground">Keep the momentum going!</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Milestones</CardTitle>
                                <Star className="w-4 h-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <Progress value={milestones.filter(m => m.achieved).length / milestones.length * 100} />
                                <p className="text-xs text-muted-foreground mt-2">
                                  {milestones.findLast(m => m.achieved)?.name || 'Just starting'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {userProfile?.dosha && recommendedActivities.length > 0 && (
                        <div className="mb-16">
                            <h2 className="font-headline text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                                {DoshaIcon && <DoshaIcon className="w-8 h-8 text-primary" />}
                                Recommended for your {userProfile.dosha} Dosha
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {recommendedActivities.map(activity => (
                                    <ActivityCard key={activity.id} activity={activity} onStart={setActivityForTimer} isCompleted={completedToday.includes(activity.id)} />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight mb-6">All Activities</h2>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {allActivities.map(activity => (
                           <ActivityCard key={activity.id} activity={activity} onStart={setActivityForTimer} isCompleted={completedToday.includes(activity.id)} />
                        ))}
                      </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}