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

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

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
          Login to Continue
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
              <Input id="name" defaultValue={userProfile?.name || user.displayName || ''} disabled />
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
              <Input id="age" placeholder="e.g., 30" disabled />
              <p className="text-xs text-muted-foreground">Profile editing coming soon.</p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="goals">Health Goals</Label>
              <Input id="goals" placeholder="e.g., Improve digestion, reduce stress" disabled />
            </div>
             <div className="space-y-2">
              <Label htmlFor="diet">Diet Preference</Label>
              <Input id="diet" placeholder="e.g., Vegetarian" disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
