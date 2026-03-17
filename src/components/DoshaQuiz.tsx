'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/loader';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

const doshaResultsData = [
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

function QuizView({ onQuizComplete }: { onQuizComplete: (dosha: Dosha) => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(Dosha | null)[]>(Array(questions.length).fill(null));

  const handleAnswerChange = (value: Dosha) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(() => {
            const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
            newAnswers.forEach(answer => {
              if (answer) counts[answer]++;
            });
            const sortedDoshas = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
            onQuizComplete(sortedDoshas[0] as Dosha);
        }, 300);
    } else {
        setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    }
  };
  
  const progress = ((answers.filter(a => a !== null).length) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl" style={{borderRadius: '14px', padding: '28px', background: 'white'}}>
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
                className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors hover:bg-secondary`}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #E8D5AF',
                }}
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


function ResultView({ result }: { result: Dosha }) {
    return (
        <div className="text-center">
            <h2 className="font-headline text-3xl font-bold">Your Ayurvedic Dosha</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                {doshaResultsData.map(dosha => (
                    <Card key={dosha.name} className={`overflow-hidden shadow-lg transition-transform duration-300 ${result === dosha.name ? 'scale-105 border-2 border-primary' : ''}`} style={{borderRadius: '12px', padding: '20px', background: 'white'}}>
                        <Image
                            src={dosha.imageUrl}
                            alt={`${dosha.name} Dosha Illustration`}
                            width={150}
                            height={150}
                            className="w-auto h-auto mx-auto mb-4"
                        />
                        <CardTitle className="font-headline text-2xl">{dosha.name}</CardTitle>
                        <CardDescription>{dosha.description}</CardDescription>
                    </Card>
                ))}
            </div>
             <div className="mt-12">
                <Button asChild size="lg">
                    <Link href="/activities">Unlock Your Personalized Wellness Plan</Link>
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">Continue to discover activities tailored for your dosha.</p>
            </div>
        </div>
    )
}

export default function DoshaQuiz() {
  const [quizComplete, setQuizComplete] = useState(false);
  const [doshaResult, setDoshaResult] = useState<Dosha | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuizComplete = (result: Dosha) => {
    setLoading(true);
    localStorage.setItem('doshaResult', result);
    setDoshaResult(result);
    setQuizComplete(true);
    setLoading(false);
  };

  if (loading) {
      return (
          <Card className="w-full max-w-2xl mx-auto shadow-2xl flex items-center justify-center min-h-[480px]">
              <Loader className="h-12 w-12 text-primary" />
          </Card>
      )
  }

  return quizComplete && doshaResult ? <ResultView result={doshaResult} /> : <QuizView onQuizComplete={handleQuizComplete} />;
}
