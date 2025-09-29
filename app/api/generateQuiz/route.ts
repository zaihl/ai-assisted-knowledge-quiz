import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // **FIX:** Destructure all required parameters from the request body
        const { topic, questionCount, difficulty } = await request.json();

        // Validate that all required parameters are present
        if (!topic || !questionCount || !difficulty) {
            return NextResponse.json(
                { error: "Missing required parameters: topic, questionCount, or difficulty" },
                { status: 400 }
            );
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY!,
        });

        const tools = [{ googleSearch: {} }];
        const config = {
            thinkingConfig: {
                thinkingBudget: 0,
            },
            tools,
        };
        const model = 'gemini-2.5-flash-lite';

        // **FIX:** The prompt now dynamically incorporates the user's selected question count and difficulty
        const prompt = `
            You are an expert quiz creator. Generate a ${questionCount}-question multiple-choice quiz about "${topic}" with a difficulty level of "${difficulty}".
            Each question must have 4 options, and only one option can be correct.
            Your response MUST be a valid JSON object. Do not include any text outside of the JSON object.
            The JSON object should have a single key "questions", which is an array of question objects.
            Each question object should have the following structure:
            {
                "question": "The question text",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "answer": "The correct option text"
            }
        `;

        const contents = [
            {
                role: 'user',
                parts: [{ text: prompt }],
            },
        ];

        const responseStream = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        // Aggregate the streamed response
        let fullResponse = "";
        for await (const chunk of responseStream) {
            if (chunk.text) {
                fullResponse += chunk.text;
            }
        }

        // Clean the response text to ensure it's valid JSON
        const cleanedText = fullResponse.replace(/```json/g, "").replace(/```/g, "").trim();

        // Parse the JSON string into an object
        const quizData = JSON.parse(cleanedText);

        return NextResponse.json(quizData);

    } catch (error) {
        console.error("Error generating quiz:", error);
        return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
    }
}

