"use client";

import { useQuizStore } from "@/store/quizStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

export function QuizOptions() {
    // **FIX:** Use individual selectors for more reliable re-renders.
    const questionCount = useQuizStore((state) => state.questionCount);
    const difficulty = useQuizStore((state) => state.difficulty);
    const setQuestionCount = useQuizStore((state) => state.setQuestionCount);
    const setDifficulty = useQuizStore((state) => state.setDifficulty);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customize Your Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="question-count">
                        Number of Questions:{" "}
                        <span className="font-bold text-primary">
                            {questionCount}
                        </span>
                    </Label>
                    <Slider
                        id="question-count"
                        min={5}
                        max={20}
                        step={1}
                        value={[questionCount]}
                        onValueChange={(value) => setQuestionCount(value[0])}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger id="difficulty" className="w-full">
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
