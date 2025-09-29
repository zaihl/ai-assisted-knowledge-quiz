"use client";

import { useQuizStore } from "@/store/quizStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

export function QuestionCard({
    question,
    options,
    answer,
    difficulty,
}: {
    question: string;
    options: string[];
    answer: string;
    difficulty: string;
}) {
    const { selectAnswer, userAnswers, currentQuestion } = useQuizStore();
    const userAnswer = userAnswers[currentQuestion];
    const isAnswered = userAnswer != null;

    const handleSelect = (option: string) => {
        if (isAnswered) return;
        selectAnswer(option);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{question}</CardTitle>
                    <Badge variant="outline" className="ml-4 shrink-0">
                        {difficulty}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    onValueChange={handleSelect}
                    value={userAnswer || ""}
                    className="space-y-3"
                >
                    {options.map((option) => {
                        const isSelected = userAnswer === option;
                        const isCorrect = answer === option;

                        return (
                            <div
                                key={option}
                                className="flex items-center space-x-3"
                            >
                                <RadioGroupItem value={option} id={option} />
                                <Label
                                    htmlFor={option}
                                    className={cn(
                                        "w-full cursor-pointer rounded-md border p-3 text-sm transition-colors",
                                        // Default State
                                        "border-border bg-transparent hover:bg-accent",
                                        // Selected but not yet confirmed
                                        isSelected &&
                                            !isAnswered &&
                                            "border-primary bg-primary/10",
                                        // Correct Answer
                                        isAnswered &&
                                            isCorrect &&
                                            "border-green-500 bg-green-900/50 text-white",
                                        // Selected but Incorrect
                                        isSelected &&
                                            isAnswered &&
                                            !isCorrect &&
                                            "border-red-500 bg-red-900/50 text-white"
                                    )}
                                >
                                    {option}
                                </Label>
                            </div>
                        );
                    })}
                </RadioGroup>
            </CardContent>
        </Card>
    );
}
