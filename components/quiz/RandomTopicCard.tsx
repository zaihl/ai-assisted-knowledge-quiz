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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2 } from "lucide-react";
import { getRandomTopics } from "@/lib/api";
import { useQuizStore } from "@/store/quizStore";

export function RandomTopicCard() {
    const [isLoading, setIsLoading] = useState(false);
    const [topics, setTopics] = useState<string[]>([]);
    const router = useRouter();
    const { questionCount, difficulty } = useQuizStore();

    const fetchRandomTopics = async () => {
        setIsLoading(true);
        setTopics([]);
        try {
            const data = await getRandomTopics();
            setTopics(data.topics || []);
        } catch (error) {
            console.error("Failed to fetch random topics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicClick = (topic: string) => {
        const slug = topic.toLowerCase().replace(/\s+/g, "-");
        router.push(
            `/quiz/${slug}?count=${questionCount}&difficulty=${difficulty}`
        );
    };

    return (
        <Card className="border">
            <CardHeader>
                <CardTitle>Feeling Lucky?</CardTitle>
                <CardDescription>
                    Let AI generate some topics for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    onClick={fetchRandomTopics}
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Inspire Me
                </Button>
                {topics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {topics.map((topic) => (
                            <Badge
                                key={topic}
                                variant="secondary"
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                onClick={() => handleTopicClick(topic)}
                            >
                                {topic}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
