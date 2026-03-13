'use client';

import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/ui/loader';
import { useEffect, useState, useCallback, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { debounce } from '@/lib/utils';

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthGoals, setHealthGoals] = useState('');
  const [diet, setDiet] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || user?.displayName || '');
      setAge(userProfile.age || '');
      setGender(userProfile.gender || '');
      setHealthGoals(userProfile.healthGoals || '');
      setDiet(userProfile.diet || '');
    }
  }, [userProfile, user]);

  const debouncedUpdate = useCallback(
    debounce(async (dataToUpdate: any) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, dataToUpdate);
      }
    }, 1000),
    [user]
  );

  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }

    if (user) {
        debouncedUpdate({ name, age, gender, healthGoals, diet });
    }
  }, [name, age, gender, healthGoals, diet, user, debouncedUpdate]);


  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <h2 className="font-headline text-3xl font-bold">Access Your Wellness Profile</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Login to view your personalized dosha insights and manage your profile.
        </p>
        <Button onClick={() => router.push('/login')} size="lg" className="mt-8">
          Login for free
        </Button>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">My Wellness Profile</CardTitle>
            <CardDescription>View and manage your personal information and wellness goals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.email || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label>Dominant Dosha</Label>
              <div>
                {userProfile?.dosha ? (
                  <Badge variant="secondary" className="text-lg px-4 py-1">{userProfile.dosha}</Badge>
                ) : (
                  <div className="flex items-center gap-4">
                    <p className="text-muted-foreground">Not determined yet.</p>
                    <Button variant="outline" onClick={() => router.push('/quiz')}>Take the Quiz</Button>
                  </div>
                )}
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" placeholder="e.g., 30" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" placeholder="e.g., Female" value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="goals">Health Goals</Label>
              <Input id="goals" placeholder="e.g., Improve digestion, reduce stress" value={healthGoals} onChange={(e) => setHealthGoals(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="diet">Diet Preference</Label>
              <Input id="diet" placeholder="e.g., Vegetarian" value={diet} onChange={(e) => setDiet(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
