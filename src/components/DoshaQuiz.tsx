'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/loader';
import { useToast } from '@/hooks/use-toast';

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

type Dosha = 'Vata' | 'Pitta' | 'Kapha';

export default function DoshaQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(Dosha | null)[]>(Array(questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (value: Dosha) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
    setTimeout(handleNext, 300);
  };

  const calculateDosha = (): Dosha => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    answers.forEach(answer => {
      if (answer) counts[answer]++;
    });
    
    const sortedDoshas = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return sortedDoshas[0] as Dosha;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: 'You must be logged in to save your result.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const dominantDosha = calculateDosha();
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { dosha: dominantDosha }, { merge: true });
      toast({
        title: "Prakriti Test Complete!",
        description: `Your dominant dosha is ${dominantDosha}. Redirecting to your dashboard...`,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("Error updating dosha: ", error);
      toast({ title: 'An error occurred', description: 'Could not save your dosha profile.', variant: 'destructive' });
      setLoading(false);
    }
  };

  const isComplete = answers.every(answer => answer !== null);
  const progress = ((answers.filter(a => a !== null).length) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">Discover Your Prakriti</CardTitle>
        <CardDescription className="text-center">Answer these 5 questions to find your unique mind-body constitution.</CardDescription>
        <Progress value={progress} className="mt-4" />
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
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
        {isComplete && (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader className="h-4 w-4" /> : 'See My Result'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
