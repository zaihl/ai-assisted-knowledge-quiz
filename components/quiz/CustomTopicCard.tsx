"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";

export function CustomTopicCard() {
    const [topic, setTopic] = useState("");
    const router = useRouter();
    const { questionCount, difficulty } = useQuizStore();

    const handleStartQuiz = () => {
        if (topic.trim()) {
            const slug = topic.trim().toLowerCase().replace(/\s+/g, "-");
            router.push(
                `/quiz/${slug}?count=${questionCount}&difficulty=${difficulty}`
            );
        }
    };

    return (
        <Card className="border">
            <CardHeader>
                <CardTitle>Custom Topic</CardTitle>
                <CardDescription>
                    Enter any topic you can imagine.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="e.g., The Roman Empire"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleStartQuiz()
                        }
                    />
                    <Button
                        type="submit"
                        onClick={handleStartQuiz}
                        disabled={!topic.trim()}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
