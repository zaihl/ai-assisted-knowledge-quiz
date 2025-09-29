"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore, Question } from "@/store/quizStore";
import { QuestionCard } from "./QuestionCard";
import { Button } from "../ui/button";
import { AppLayout } from "../ui/AppLayout";
import { Progress } from "../ui/progress";

export function QuizClient({ questions }: { questions: Question[] }) {
    const {
        currentQuestion,
        nextQuestion,
        setQuestions,
        reset,
        userAnswers,
        difficulty,
    } = useQuizStore();
    const router = useRouter();

    useEffect(() => {
        reset(); // Reset state when a new quiz starts
        setQuestions(questions);
    }, [questions, setQuestions, reset]);

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            const topicSlug = window.location.pathname.split("/")[2];
            router.push(`/quiz/${topicSlug}/results`);
        }
    };

    if (!questions || questions.length === 0) {
        return (
            <AppLayout>
                <p>Loading quiz...</p>
            </AppLayout>
        );
    }

    const currentQ = questions[currentQuestion];
    const isAnswered = userAnswers[currentQuestion] != null;
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-full p-4 w-full">
                <div className="w-full max-w-2xl mx-auto space-y-6">
                    <div className="space-y-2 text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                        <Progress value={progress} className="w-full" />
                    </div>

                    <QuestionCard
                        question={currentQ.question}
                        options={currentQ.options}
                        answer={currentQ.answer}
                        difficulty={difficulty}
                    />

                    <div className="flex justify-end">
                        <Button onClick={handleNext} disabled={!isAnswered}>
                            {currentQuestion < questions.length - 1
                                ? "Next Question"
                                : "Finish Quiz"}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
