import { NextResponse } from "next/server";
import { runGemini } from "@/lib/gemini";

export async function GET() {
    try {
        const prompt = `
            Generate an array of 5 unique and engaging topics for a trivia quiz.
            Examples could be 'The Science of Sleep' or 'Famous Movie Quotes'.
            Respond with a valid JSON object with a single key "topics" which holds an array of strings.
            Do not include any text outside of the JSON object.
        `;

        // Call the centralized Gemini handler.
        const geminiResponse = await runGemini(prompt);

        // Parse the cleaned JSON string from the handler.
        const topicsData = JSON.parse(geminiResponse);

        return NextResponse.json(topicsData);

    } catch (error) {
        console.error("Error in randomTopics route:", error);
        return NextResponse.json({ error: "Failed to generate random topics" }, { status: 500 });
    }
}

