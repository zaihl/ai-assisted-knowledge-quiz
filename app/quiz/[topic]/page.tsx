import { QuizClient } from "@/components/quiz/QuizClient";
import { getQuizData } from "@/lib/api";
import { Question } from "@/store/quizStore";
import { redirect } from "next/navigation";

interface QuizPageProps {
    params: { topic: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function QuizPage({
    params: paramsPromise,
    searchParams: searchParamsPromise,
}: QuizPageProps) {
    // **FIX:** Await the params and searchParams promises to resolve their values
    const params = await paramsPromise;
    const searchParams = await searchParamsPromise;

    const { topic: topicSlug } = params;

    if (!topicSlug) {
        redirect("/quiz");
    }

    const topic = decodeURIComponent(topicSlug.replace(/-/g, " "));
    const count = Number(searchParams.count) || 5;
    const difficulty = (searchParams.difficulty as string) || "Normal";

    const quizData = await getQuizData(topic, count, difficulty);

    if (!quizData || !quizData.questions) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>
                    Could not generate a quiz for this topic. Please try another
                    one.
                </p>
            </div>
        );
    }

    const questions: Question[] = quizData.questions;

    return <QuizClient questions={questions} />;
}
