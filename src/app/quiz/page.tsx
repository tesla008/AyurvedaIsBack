import DoshaQuiz from "@/components/DoshaQuiz";
import Image from "next/image";

export default function QuizPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-8rem)] bg-secondary p-4 sm:p-6 md:p-8">
            <div className="text-center mb-8">
                 <Image
                    src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
                    alt="Ayurveda at Tips Logo"
                    width={100}
                    height={100}
                    className="mx-auto mb-5 h-auto w-[100px] object-contain"
                />
                <h1 className="font-headline text-4xl font-bold">Discover Your Dosha</h1>
                <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
                    Answer a few quick questions to understand your Ayurvedic body constitution.
                </p>
            </div>
            <DoshaQuiz />
        </div>
    )
}
