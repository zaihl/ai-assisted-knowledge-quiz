import { NextResponse } from "next/server";
import { runGemini } from "@/lib/gemini";

export async function POST(request: Request) {
    try {
        const { topic, score, questions, userAnswers, difficulty } = await request.json();

        if (topic == null || score == null || !questions || !userAnswers) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const performanceSummary = questions.map((q: any, index: number) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.answer;
            return `Question ${index + 1}: "${q.question}"
- Your Answer: ${userAnswer || "Not answered"} (${isCorrect ? 'Correct' : 'Incorrect'})
- Correct Answer: ${q.answer}`;
        }).join('\n\n');

        const prompt = `
            You are a friendly and encouraging AI tutor. A user has just completed a quiz.
            
            Here is their performance data:
            - Topic: "${topic}"
            - Difficulty: "${difficulty || 'Normal'}"
            - Final Score: ${score} out of ${questions.length}

            Here is a summary of their answers:
            ${performanceSummary}

            Please provide personalized and detailed feedback based on their performance. The feedback should be:
            1. Encouraging and positive in tone, regardless of the score.
            2. Specific to the topic. Mention the topic by name.
            3. Acknowledge their score and the quiz difficulty.
            4. Identify one or two key areas where they did well or struggled, based on the answer summary.
            5. Suggest a specific concept they could review to improve their knowledge on this topic.
            
            Keep the feedback concise, around 3-4 sentences. Address the user directly.
            Do not return JSON, just the plain text feedback.
        `;

        const feedbackText = await runGemini(prompt);

        return NextResponse.json({ feedback: feedbackText });

    } catch (error) {
        console.error("Error generating feedback:", error);
        return NextResponse.json({ error: "Failed to generate feedback" }, { status: 500 });
    }
}

