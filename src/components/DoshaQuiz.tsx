'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/loader';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const questions = [
  {
    question: "What best describes your body frame?",
    options: [
      { text: "Thin, light, and slender", value: "Vata" },
      { text: "Medium, muscular, and athletic", value: "Pitta" },
      { text: "Large, sturdy, and well-built", value: "Kapha" },
    ],
  },
  {
    question: "How is your typical appetite?",
    options: [
      { text: "Irregular, varies between high and low", value: "Vata" },
      { text: "Strong, sharp, and I get irritable when hungry", value: "Pitta" },
      { text: "Slow but steady, I can skip meals easily", value: "Kapha" },
    ],
  },
  {
    question: "What is your skin usually like?",
    options: [
      { text: "Dry, thin, and cool to the touch", value: "Vata" },
      { text: "Sensitive, reddish, and warm", value: "Pitta" },
      { text: "Oily, smooth, and cool", value: "Kapha" },
    ],
  },
  {
    question: "How do you typically react under stress?",
    options: [
      { text: "I become anxious, worried, or overwhelmed", value: "Vata" },
      { text: "I become irritable, impatient, or angry", value: "Pitta" },
      { text: "I withdraw, become quiet, and avoid conflict", value: "Kapha" },
    ],
  },
  {
    question: "Describe your sleep pattern.",
    options: [
      { text: "Light, interrupted, and I often have trouble falling asleep", value: "Vata" },
      { text: "Sound and I sleep for a moderate duration, but can get hot", value: "Pitta" },
      { text: "Heavy, long, and I have trouble waking up", value: "Kapha" },
    ],
  },
];

const resultDoshas = [
  {
    name: 'Vata',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Vata.png',
    description: 'Energy of movement and creativity.',
  },
  {
    name: 'Pitta',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Pitta%20(1).png',
    description: 'Energy of digestion, focus, and transformation.',
  },
  {
    name: 'Kapha',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Kapha.png',
    description: 'Energy of stability, structure, and calm.',
  },
];

type Dosha = 'Vata' | 'Pitta' | 'Kapha';

export default function DoshaQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(Dosha | null)[]>(Array(questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [dominantDosha, setDominantDosha] = useState<Dosha | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAnswerChange = (value: Dosha) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(() => handleSubmit(newAnswers), 300);
    } else {
        setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    }
  };

  const calculateDosha = (finalAnswers: (Dosha|null)[]): Dosha => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    finalAnswers.forEach(answer => {
      if (answer) counts[answer]++;
    });
    
    const sortedDoshas = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return sortedDoshas[0] as Dosha;
  };

  const handleSubmit = async (finalAnswers: (Dosha|null)[]) => {
    if (!user) {
      toast({ title: 'You must be logged in to save your result.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const calculatedDosha = calculateDosha(finalAnswers);
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { dosha: calculatedDosha }, { merge: true });
      
      setDominantDosha(calculatedDosha);
      setQuizComplete(true);

      toast({
        title: "Prakriti Test Complete!",
        description: `Your dominant dosha is ${calculatedDosha}.`,
      });
    } catch (error) {
      console.error("Error updating dosha: ", error);
      toast({ title: 'An error occurred', description: 'Could not save your dosha profile.', variant: 'destructive' });
    } finally {
        setLoading(false);
    }
  };

  const progress = ((answers.filter(a => a !== null).length) / questions.length) * 100;

  if (loading) {
      return (
          <Card className="w-full max-w-2xl mx-auto shadow-2xl flex items-center justify-center min-h-[480px]">
              <Loader className="h-12 w-12 text-primary" />
          </Card>
      )
  }

  if (quizComplete && dominantDosha) {
    return (
        <div className="text-center w-full max-w-5xl">
            <h2 className="font-headline text-3xl font-bold">Your Ayurvedic Dosha is {dominantDosha}</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {resultDoshas.map(dosha => (
                <Card key={dosha.name} className={cn(
                    "p-6 text-center shadow-lg transition-all duration-300 bg-card",
                    dominantDosha === dosha.name && "border-2 border-primary scale-105"
                )}>
                    <Image src={dosha.imageUrl} alt={dosha.name} width={150} height={150} className="mx-auto mb-4 rounded-lg object-contain aspect-square"/>
                    <h3 className="font-headline text-2xl font-bold">{dosha.name}</h3>
                    <p className="text-muted-foreground mt-2">{dosha.description}</p>
                </Card>
                ))}
            </div>
            <div className="mt-12">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-auto px-8 py-4 text-base transition-transform hover:scale-105">
                    <Link href="/#sampoorna-plan">Unlock Your Personalized Wellness Plan</Link>
                </Button>
                <p className="mt-4 text-sm text-foreground font-medium">
                    Get <span className="font-semibold text-primary">20% off</span> your subscription based on your dosha.
                </p>
            </div>
        </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <div className="min-h-[250px]">
          <h3 className="text-lg font-semibold mb-6 text-center">{questions[currentQuestionIndex].question}</h3>
          <RadioGroup
            onValueChange={handleAnswerChange}
            value={answers[currentQuestionIndex] || ''}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {questions[currentQuestionIndex].options.map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground ${
                  answers[currentQuestionIndex] === option.value
                    ? 'bg-accent text-accent-foreground border-accent-foreground'
                    : ''
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                <span className="text-center">{option.text}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
      </CardFooter>
    </Card>
  );
}
