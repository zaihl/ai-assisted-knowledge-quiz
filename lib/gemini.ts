import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

// Define the standard configuration for all API calls.
const generationConfig = {
    thinkingConfig: {
        thinkingBudget: 0,
    },
    tools: [{ googleSearch: {} }],
};

const model = 'gemini-2.5-flash-lite';

/**
 * A centralized function to run content generation with the Gemini API.
 * @param {string} prompt The user prompt to send to the AI.
 * @returns {Promise<string>} A promise that resolves to the aggregated and cleaned text response from the AI.
 */
export async function runGemini(prompt: string): Promise<string> {
    const contents = [
        {
            role: 'user',
            parts: [{ text: prompt }],
        },
    ];

    try {
        // Call the Gemini API using the streaming method.
        const responseStream = await ai.models.generateContentStream({
            model,
            config: generationConfig,
            contents,
        });

        // Aggregate the streamed chunks into a single response string.
        let fullResponse = "";
        for await (const chunk of responseStream) {
            if (chunk.text) {
                fullResponse += chunk.text;
            }
        }

        // Clean the response to remove any markdown formatting (like ```json)
        // that the AI might add, ensuring a clean string for parsing.
        return fullResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    } catch (error) {
        console.error("Error running Gemini API:", error);
        // In case of an error with the API call, we throw an error
        // to be caught by the calling API route.
        throw new Error("Failed to communicate with the Gemini API.");
    }
}
