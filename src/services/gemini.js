import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_MODEL = "gemini-2.5-pro";
const FALLBACK_MODELS = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"];

let genAI = null;
let model = null;
let activeModelName = DEFAULT_MODEL;

const getModelCandidates = () => {
    const candidates = [activeModelName, ...FALLBACK_MODELS];
    return [...new Set(candidates.filter(Boolean))];
};

const isModelUnavailableError = (error) => {
    const code = error?.status ?? error?.code;
    const message = `${error?.message || ''}`.toLowerCase();

    return (
        code === 404 ||
        code === 'NOT_FOUND' ||
        message.includes('not found') ||
        message.includes('unsupported model') ||
        message.includes('is not found for api version')
    );
};

const runGeneration = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

export const initialize = (apiKey, modelName = DEFAULT_MODEL) => {
    if (!apiKey) return;
    genAI = new GoogleGenerativeAI(apiKey);
    activeModelName = modelName || DEFAULT_MODEL;
    model = genAI.getGenerativeModel({ model: activeModelName });
};

export const generateText = async (prompt) => {
    if (!model) throw new Error("Gemini API key not set.");

    try {
        return await runGeneration(prompt);
    } catch (error) {
        if (!genAI || !isModelUnavailableError(error)) {
            console.error("Gemini Generation Error:", error);
            throw error;
        }

        const modelCandidates = getModelCandidates();

        for (const candidate of modelCandidates) {
            if (candidate === activeModelName) continue;

            try {
                model = genAI.getGenerativeModel({ model: candidate });
                activeModelName = candidate;
                return await runGeneration(prompt);
            } catch (fallbackError) {
                if (!isModelUnavailableError(fallbackError)) {
                    console.error("Gemini Generation Error:", fallbackError);
                    throw fallbackError;
                }
            }
        }

        console.error("Gemini Generation Error:", error);
        throw error;
    }
};
