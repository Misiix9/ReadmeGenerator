import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;
let model = null;

export const initializeGemini = (apiKey) => {
    if (!apiKey) return;
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
};

export const generateText = async (prompt) => {
    if (!model) throw new Error("Gemini API key not set. Please configure it in Settings.");

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        throw error;
    }
};

export const analyzeRepo = async (fileTree, fileContents = {}) => {
    if (!model) throw new Error("Gemini API key not set.");

    const prompt = `
      You are an expert developer tool. Analyze the following project structure and file contents to understand the project.
      
      File Tree:
      ${JSON.stringify(fileTree, null, 2)}
      
      Key File Contents (package.json, etc):
      ${JSON.stringify(fileContents, null, 2)}
      
      Based on this, generate a JSON object with the following keys:
      - features: An array of strings describing key features.
      - techStack: An array of strings listing technologies used.
      - description: A short, catchy description of the project.
      
      Return ONLY valid JSON.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Repo Analysis Error:", error);
        throw error;
    }
};

export const generateSectionContent = async (type, context = "") => {
    if (!model) throw new Error("Gemini API key not set.");

    let prompt = "";
    switch (type) {
        case 'description':
            prompt = `Write a professional project description based on: ${context}`;
            break;
        case 'installation':
            prompt = `Write a standard installation guide (npm/yarn/pip) for a project using: ${context}`;
            break;
        case 'usage':
            prompt = `Write a generic usage example for a project described as: ${context}`;
            break;
        case 'features':
            prompt = `List 5 key features for a project described as: ${context}`;
            break;
        case 'faq':
            prompt = `Generate 3 common FAQ items for a developer tool project.`;
            break;
        default:
            prompt = `Generate content for a README section of type "${type}". Context: ${context}`;
    }

    return generateText(prompt);
};
