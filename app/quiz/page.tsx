"use client";

import { AppLayout } from "@/components/ui/AppLayout";
import { CustomTopicCard } from "@/components/quiz/CustomTopicCard";
import { RandomTopicCard } from "@/components/quiz/RandomTopicCard";
import { InfoCard } from "@/components/quiz/InfoCard";
import { TopicGrid } from "@/components/quiz/TopicGrid";
import { QuizOptions } from "@/components/quiz/QuizOptions";

export default function QuizHomePage() {
    return (
        <AppLayout>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CustomTopicCard />
                    <RandomTopicCard />
                    <InfoCard />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <TopicGrid />
                    </div>
                    <QuizOptions />
                </div>
            </div>
        </AppLayout>
    );
}
