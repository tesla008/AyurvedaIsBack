import AuthGuard from "@/components/AuthGuard";
import DoshaQuiz from "@/components/DoshaQuiz";

export default function QuizPage() {
    return (
        <AuthGuard>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-secondary p-4 sm:p-6 md:p-8">
                <DoshaQuiz />
            </div>
        </AuthGuard>
    )
}
