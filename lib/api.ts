import { Question } from "@/store/quizStore";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function getQuizData(topic: string, count: number, difficulty: string) {
    const response = await fetch(`${APP_URL}/api/generateQuiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, questionCount: count, difficulty }),
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
    }
    return response.json();
}

export async function getFeedback(
    topic: string,
    score: number,
    questions: Question[],
    userAnswers: (string | null)[],
    difficulty: string
) {
    const response = await fetch(`${APP_URL}/api/generateFeedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, score, questions, userAnswers, difficulty }),
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch feedback: ${response.statusText}`);
    }
    return response.json();
}

export async function getRandomTopics() {
    const response = await fetch(`${APP_URL}/api/randomTopics`);
    if (!response.ok) {
        throw new Error(`Failed to fetch random topics: ${response.statusText}`);
    }
    return response.json();
}

