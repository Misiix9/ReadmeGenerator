import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;
let model = null;

export const initialize = (apiKey, modelName = "gemini-1.5-pro") => {
    if (!apiKey) return;
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: modelName });
};

export const generateText = async (prompt) => {
    if (!model) throw new Error("Gemini API key not set.");

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        throw error;
    }
};
