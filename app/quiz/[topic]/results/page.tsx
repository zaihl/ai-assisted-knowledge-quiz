"use client";

import { AppLayout } from "@/components/ui/AppLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getFeedback } from "@/lib/api";
import { useQuizStore } from "@/store/quizStore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResultsPage() {
    const router = useRouter();
    const params = useParams();
    const topicSlug = params.topic as string;

    const { score, questions, userAnswers, reset, difficulty } = useQuizStore();
    const [feedback, setFeedback] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const topic = decodeURIComponent(topicSlug?.replace(/-/g, " ") || "");

    useEffect(() => {
        if (!topicSlug) return;
        if (questions.length === 0) {
            router.push(`/quiz/${topicSlug}`);
            return;
        }

        const fetchFeedback = async () => {
            try {
                const data = await getFeedback(
                    topic,
                    score,
                    questions,
                    userAnswers,
                    difficulty
                );
                setFeedback(data.feedback);
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
                setFeedback(
                    "We couldn't generate feedback for this quiz. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedback();
    }, [questions, score, topic, userAnswers, topicSlug, router, difficulty]);

    if (questions.length === 0) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-full p-4">
                <Card className="w-full max-w-2xl text-center">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            Quiz Results
                        </CardTitle>
                        <CardDescription>Topic: {topic}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-6 rounded-lg bg-secondary">
                            <p className="text-lg text-secondary-foreground">
                                Your Score
                            </p>
                            <p className="text-6xl font-bold text-foreground">
                                {score}{" "}
                                <span className="text-2xl text-muted-foreground">
                                    / {questions.length}
                                </span>
                            </p>
                        </div>

                        <div className="text-left space-y-4">
                            <h3 className="font-semibold text-lg">
                                AI Tutor Feedback:
                            </h3>
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <p className="text-muted-foreground italic">
                                        Generating personalized feedback...
                                    </p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic whitespace-pre-wrap">
                                    {feedback}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-left">
                                Review Your Answers:
                            </h3>
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className="text-left p-4 border rounded-md bg-secondary/50"
                                >
                                    <p className="font-semibold">
                                        {q.question}
                                    </p>
                                    <p
                                        className={`flex items-center mt-2 text-sm ${
                                            userAnswers[index] === q.answer
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {userAnswers[index] === q.answer ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        Your answer:{" "}
                                        {userAnswers[index] || "Not answered"}
                                    </p>
                                    {userAnswers[index] !== q.answer && (
                                        <p className="text-sm text-green-400 mt-1">
                                            Correct answer: {q.answer}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            <Button asChild onClick={reset}>
                                <Link href="/quiz">Try Another Topic</Link>
                            </Button>
                            <Button variant="outline" asChild onClick={reset}>
                                <Link
                                    href={`/quiz/${topicSlug}?count=${questions.length}&difficulty=${difficulty}`}
                                >
                                    Retake This Quiz
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
