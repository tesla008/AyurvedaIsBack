'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/loader';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
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

const doshaResultsData = [
  {
    name: 'Vata',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Vata.png',
    description: 'Energy of movement and creativity.',
    elements: 'Air & Space',
    color: 'text-sky-500',
    progressColor: 'bg-sky-500',
    bgColor: 'bg-sky-50',
  },
  {
    name: 'Pitta',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Pitta%20(1).png',
    description: 'Energy of digestion, focus, and transformation.',
    elements: 'Fire & Water',
    color: 'text-rose-500',
    progressColor: 'bg-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    name: 'Kapha',
    imageUrl: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/Kapha.png',
    description: 'Energy of stability, structure, and calm.',
    elements: 'Earth & Water',
    color: 'text-emerald-500',
    progressColor: 'bg-emerald-500',
    bgColor: 'bg-emerald-50',
  },
];


type Dosha = 'Vata' | 'Pitta' | 'Kapha';
type DoshaPercentages = { [key in Dosha]: number };


function QuizView({ onQuizComplete }: { onQuizComplete: (dosha: DoshaPercentages) => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(Dosha | null)[]>(Array(questions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswerChange = (value: Dosha) => {
    if (isTransitioning) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
    setIsTransitioning(true);
    
    setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1) {
            const counts: { [key in Dosha]: number } = { Vata: 0, Pitta: 0, Kapha: 0 };
            newAnswers.forEach(answer => {
              if (answer) counts[answer]++;
            });
            const total = newAnswers.length;

            if (total === 0) {
              onQuizComplete({Vata: 33, Pitta: 34, Kapha: 33});
              return;
            }

            const sortedCounts = (Object.entries(counts) as [Dosha, number][]).sort(([, a], [, b]) => b - a);
            const finalPercentages: any = {};
            
            const p1_name = sortedCounts[0][0];
            const p2_name = sortedCounts[1][0];
            const p3_name = sortedCounts[2][0];
            
            finalPercentages[p1_name] = Math.round((sortedCounts[0][1] / total) * 100);
            finalPercentages[p2_name] = Math.round((sortedCounts[1][1] / total) * 100);
            finalPercentages[p3_name] = 100 - finalPercentages[p1_name] - finalPercentages[p2_name];

            onQuizComplete(finalPercentages as DoshaPercentages);

        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsTransitioning(false);
        }
    }, 400);
  };
  
  const progress = ((answers.filter(a => a !== null).length) / questions.length) * 100;
  const question = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-background/80 backdrop-blur-sm" style={{borderRadius: '14px', padding: '28px'}}>
      <CardHeader>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="min-h-[250px] flex flex-col justify-center">
            <div key={currentQuestionIndex} className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                <h3 className="text-xl font-semibold mb-6 text-center">{question.question}</h3>
                <RadioGroup
                    onValueChange={handleAnswerChange}
                    value={answers[currentQuestionIndex] || ''}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {question.options.map((option) => (
                    <Label
                        key={option.value}
                        htmlFor={option.value}
                        className={cn(
                            `flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`,
                            `[&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:shadow-lg [&:has([data-state=checked])]:scale-105`
                        )}
                        style={{
                            padding: '14px',
                            borderRadius: '8px',
                        }}
                    >
                        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                        <span className="text-center text-base">{option.text}</span>
                    </Label>
                    ))}
                </RadioGroup>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center pt-4">
        <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
      </CardFooter>
    </Card>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1200;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = end / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayValue(Math.ceil(start));
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}%</>;
}


function ResultView({ results }: { results: DoshaPercentages }) {
    const sortedDoshas = (Object.entries(results) as [Dosha, number][]).sort(([, a], [, b]) => b - a);
    const [primary, secondary] = sortedDoshas;
    let dominantType = primary[0];
    let summaryText = '';

    if (primary[1] > 0 && secondary && secondary[1] > 0 && primary[1] - secondary[1] <= 10) {
        const sortedPair = [primary[0], secondary[0]].sort();
        dominantType = `${sortedPair[0]}-${sortedPair[1]}`;
        summaryText = `Your dosha balance suggests a ${dominantType} profile, blending the qualities of both energies for a unique constitution.`;
    } else {
        const getDoshaQualities = (dosha: Dosha) => {
            switch (dosha) {
                case 'Vata': return 'creative, energetic, and governed by movement';
                case 'Pitta': return 'driven, focused, and intense';
                case 'Kapha': return 'calm, stable, and governed by structure';
                default: return '';
            }
        };
        summaryText = `You are primarily ${dominantType}, which means you are naturally ${getDoshaQualities(dominantType)}.`;
    }

    const [progress, setProgress] = useState<DoshaPercentages | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(results), 100);
        return () => clearTimeout(timer);
    }, [results]);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl p-6 sm:p-8 md:p-12 animate-in fade-in zoom-in-95 duration-700 bg-card/80 backdrop-blur-sm rounded-2xl">
            <CardHeader className="text-center p-0">
                <Sparkles className="mx-auto h-12 w-12 text-primary/80" />
                <CardTitle className="font-headline text-4xl sm:text-5xl mt-2">Your Prakriti Profile</CardTitle>
                <CardDescription className="text-xl text-muted-foreground mt-2">
                    Dominant Type: <span className="font-semibold text-primary">{dominantType}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {doshaResultsData.map((dosha) => {
                        const percentage = results[dosha.name as Dosha];
                        const isDominant = dominantType.includes(dosha.name);
                        
                        return (
                            <Card key={dosha.name} className={cn(
                                'text-center p-6 rounded-xl transition-all duration-500 ease-out flex flex-col items-center justify-start',
                                isDominant ? 'shadow-primary/20 shadow-xl scale-105 bg-background' : 'bg-background/50'
                            )}>
                               <Image
                                  src={dosha.imageUrl}
                                  alt={`${dosha.name} Dosha Illustration`}
                                  width={120}
                                  height={120}
                                  className="w-auto h-auto object-contain aspect-square"
                                />
                               <p className="text-5xl font-bold mt-4" style={{fontFamily: 'Playfair Display, serif'}}>
                                   <AnimatedCounter value={percentage} />
                               </p>
                               <p className="text-2xl font-headline mt-2">{dosha.name}</p>
                               <p className="text-sm text-muted-foreground">{dosha.elements}</p>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 space-y-4">
                    {doshaResultsData.map(dosha => {
                        const percentage = progress ? progress[dosha.name as Dosha] : 0;
                        return (
                            <div key={dosha.name} className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{animationDelay: `${doshaResultsData.indexOf(dosha) * 100 + 300}ms`}}>
                                <span className="w-16 font-semibold text-muted-foreground">{dosha.name}</span>
                                <Progress value={percentage} className="h-3 flex-1" indicatorClassName={dosha.progressColor} />
                                <span className="w-12 text-right font-semibold">{results[dosha.name as Dosha]}%</span>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">{summaryText}</p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href="/activities">Explore My Personalized Routine</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function DoshaQuiz() {
  const [quizComplete, setQuizComplete] = useState(false);
  const [doshaPercentages, setDoshaPercentages] = useState<DoshaPercentages | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedResult = localStorage.getItem("doshaResult");
      if (storedResult) {
        const parsedResult = JSON.parse(storedResult);
        // Basic validation
        if (parsedResult.Vata !== undefined && parsedResult.Pitta !== undefined && parsedResult.Kapha !== undefined) {
          setDoshaPercentages(parsedResult);
          setQuizComplete(true);
        }
      }
    } catch (error) {
      console.error("Failed to parse dosha result from localStorage", error);
      localStorage.removeItem("doshaResult");
    }
  }, []);

  const handleQuizComplete = (percentages: DoshaPercentages) => {
    setLoading(true);
    localStorage.setItem('doshaResult', JSON.stringify(percentages));
    
    setTimeout(() => {
        setDoshaPercentages(percentages);
        setQuizComplete(true);
        setLoading(false);
    }, 1200);
  };

  if (loading) {
      return (
          <Card className="w-full max-w-md mx-auto shadow-2xl flex flex-col items-center justify-center min-h-[480px] bg-background/80 backdrop-blur-sm rounded-xl">
              <Loader className="h-12 w-12 text-primary" />
              <p className="mt-4 text-lg font-semibold text-muted-foreground animate-pulse">Calculating your profile...</p>
          </Card>
      )
  }

  return quizComplete && doshaPercentages ? <ResultView results={doshaPercentages} /> : <QuizView onQuizComplete={handleQuizComplete} />;
}
