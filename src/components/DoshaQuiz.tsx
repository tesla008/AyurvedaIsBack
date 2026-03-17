'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/loader';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

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
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

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
    setLoading(true);
    const calculatedDosha = calculateDosha(finalAnswers);
    
    if (user) {
        try {
            await setDoc(doc(db, "users", user.uid), {
                dosha: calculatedDosha,
                quizCompleted: true
            }, { merge: true });
            router.push('/dashboard');
        } catch (e) {
            console.error("Error saving dosha result:", e);
            setLoading(false);
        }
    } else {
        localStorage.setItem('doshaResult', calculatedDosha);
        router.push('/login');
    }
  };

  const progress = ((answers.filter(a => a !== null).length) / questions.length) * 100;

  if (loading || authLoading) {
      return (
          <Card className="w-full max-w-2xl mx-auto shadow-2xl flex items-center justify-center min-h-[480px]">
              <Loader className="h-12 w-12 text-primary" />
          </Card>
      )
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
