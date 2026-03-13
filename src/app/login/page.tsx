'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Logo } from '@/components/Logo';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get('mode');
  
  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const loginBg = PlaceHolderImages.find(p => p.id === 'login-background');

  useEffect(() => {
    setIsLogin(mode !== 'signup');
  }, [mode]);

  const checkAndRedirect = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().dosha) {
      router.push('/dashboard');
    } else {
      router.push('/quiz');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const storedDosha = localStorage.getItem('doshaResult');
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (storedDosha) {
            await setDoc(doc(db, 'users', userCredential.user.uid), { dosha: storedDosha }, { merge: true });
            localStorage.removeItem('doshaResult');
        }
      } else {
        if (!name) {
            toast({ title: 'Authentication Error', description: 'Please enter your name.', variant: 'destructive' });
            setLoading(false);
            return;
        }
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: name,
          email: userCredential.user.email,
          dosha: storedDosha || null,
          createdAt: new Date(),
        });
        if (storedDosha) {
          localStorage.removeItem('doshaResult');
        }
      }
      toast({ title: isLogin ? 'Login successful!' : 'Account created!' });
      await checkAndRedirect(userCredential.user);
    } catch (error: any) {
      toast({ title: 'Authentication Error', description: error.message, variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const storedDosha = localStorage.getItem('doshaResult');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          dosha: storedDosha || null,
          createdAt: new Date(),
        });
      } else if (storedDosha) {
        await setDoc(userDocRef, { dosha: storedDosha }, { merge: true });
      }
      
      if (storedDosha) {
        localStorage.removeItem('doshaResult');
      }

      toast({ title: 'Google sign-in successful!' });
      await checkAndRedirect(user);
    } catch (error: any)      {
      toast({ title: 'Google Sign-In Error', description: error.message, variant: 'destructive' });
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      {loginBg && (
        <Image
          src={loginBg.imageUrl}
          alt={loginBg.description}
          fill
          className="object-cover"
          data-ai-hint={loginBg.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <Card className="w-full max-w-sm z-10 shadow-2xl">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">{isLogin ? 'Welcome Back' : 'Create an Account'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Enter your credentials to access your wellness journey.' : 'Join us to start your path to Ayurvedic wellness.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader className="h-4 w-4" /> : isLogin ? 'Log In' : 'Sign Up'}
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading} type="button">
              {loading ? <Loader className="h-4 w-4 mr-2" /> : 
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 172.9 56.5l-63.6 62.1C333.3 102.4 293.4 88 248 88c-77.5 0-140.2 62.4-140.2 139.3s62.7 139.3 140.2 139.3c85.3 0 119.3-63.4 123.3-95.3H248v-73.3h236.2c2.5 13.9 3.8 28.5 3.8 43.8z"></path></svg>
              }
              Continue with Google
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="px-1" type="button">
                {isLogin ? 'Sign up' : 'Log in'}
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader /></div>}>
      <LoginPageContent />
    </Suspense>
  );
}
