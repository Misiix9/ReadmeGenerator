import * as gemini from './gemini';
import * as openai from './openai';
import * as anthropic from './anthropic';

let currentProvider = 'google';
let currentModel = 'gemini-1.5-pro';
let apiKeys = {
    google: '',
    openai: '',
    anthropic: ''
};

export const PROVIDERS = {
    google: { name: 'Google Gemini', models: ['gemini-2.5-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'] },
    openai: { name: 'OpenAI', models: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
    anthropic: { name: 'Anthropic', models: ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229'] }
};

export const configureAI = (provider, model, keys) => {
    currentProvider = provider;
    currentModel = model;
    apiKeys = { ...apiKeys, ...keys };

    // Initialize specific provider if needed
    if (provider === 'google') gemini.initialize(apiKeys.google, model);
    if (provider === 'openai') openai.initialize(apiKeys.openai, model);
    if (provider === 'anthropic') anthropic.initialize(apiKeys.anthropic, model);
};

export const generateText = async (prompt) => {
    const key = apiKeys[currentProvider];
    if (!key) throw new Error(`${PROVIDERS[currentProvider].name} API key not set.`);

    if (currentProvider === 'google') return gemini.generateText(prompt);
    if (currentProvider === 'openai') return openai.generateText(prompt);
    if (currentProvider === 'anthropic') return anthropic.generateText(prompt);

    throw new Error("Unknown provider");
};


export const analyzeRepo = async (fileTree, fileContents) => {
    const key = apiKeys[currentProvider];
    if (!key) throw new Error(`${PROVIDERS[currentProvider].name} API key not set.`);

    // Ultimate Prompt Engineering: Deep Context & Specificity
    const prompt = `
      You are a **World-Class Developer Advocate** and **Senior Technical Writer**. 
      Your task is to analyze a codebase and generate the content for a **"Gold Standard" README.md** that would be featured on GitHub Trending.

      **1. INPUT DATA**
      - **File Structure**: ${JSON.stringify(fileTree, null, 2)}
      - **Key File Contents**: ${JSON.stringify(fileContents, null, 2)}

      **2. DEEP ANALYSIS PHASE (Internal Thought Process)**
      - **Identify Project Type**:
        - IF \`package.json\` has \`next\`, \`react-scripts\`, \`vite\` -> **Web Application**.
        - IF \`setup.py\` or \`requirements.txt\` exists -> **Python Project**.
        - IF \`main.go\` exists -> **Go Project**.
        - IF \`Dockerfile\` exists -> **Containerized App**.
      - **Identify Tech Stack**: Scan dependencies and config files (e.g., Tailwind, TypeScript, Postgres, Redis).
      - **Identify Commands**: Look at \`scripts\` in \`package.json\` or \`Makefile\` to find run/build commands.

      **3. CONTENT GENERATION RULES**
      - **Tone**: Professional, exciting, concise, and developer-centric.
      - **Visuals**: MANDATORY: Use **relevant emojis** for every single section header and list item.
      - **Formatting**: Use **Bold** for emphasis. Use \`Code\` for paths/variables. Use Code Blocks for commands.

      **4. REQUIRED OUTPUT (JSON Format)**
      Generate a single JSON object with these exact keys. Do not wrap in markdown.

      {
        "projectType": "Web Application" | "Library" | "CLI" | "API",
        
        "title": "String. The project name with a cool emoji (e.g., '🚀 SuperApp').",
        
        "description": "String. A 2-3 sentence 'Elevator Pitch'. Structure: Problem -> Solution -> Impact. Do NOT start with 'This project is...'. Start with the value proposition.",
        
        "features": [
          "String. Format: '✨ **Feature Name**: A short, punchy description of the benefit.'",
          "String. Format: '🛡️ **Another Feature**: Description...'"
        ],
        
        "techStack": [
          "String. Format: '⚛️ **Frontend**: React, TailwindCSS'",
          "String. Format: '🔙 **Backend**: Node.js, Express'",
          "String. Format: '🗄️ **Database**: MongoDB'"
        ],
        
        "installation": "String. A complete Markdown guide. \n- IF Web App: Title it 'Local Development'. Include 'Prerequisites' (Node version), 'Clone', 'Install', 'Run'. \n- IF Library: Title it 'Installation'. Show 'npm install' or 'pip install'. \n- Use \`\`\`bash code blocks.",
        
        "usage": "String. A Markdown guide. \n- IF Web App: Explain how to open/use the app. \n- IF Library: Provide a code snippet example in the correct language.",
        
        "license": "String. The license name (e.g., 'MIT License')."
      }
    `;

    let responseText = "";
    if (currentProvider === 'google') responseText = await gemini.generateText(prompt);
    else if (currentProvider === 'openai') responseText = await openai.generateText(prompt);
    else if (currentProvider === 'anthropic') responseText = await anthropic.generateText(prompt);

    // Clean up potential markdown code blocks from response
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to parse AI response as JSON:", responseText);
        throw new Error("AI response was not valid JSON.");
    }
};

export const generateSectionContent = async (type, context = "") => {
    const key = apiKeys[currentProvider];
    if (!key) throw new Error(`${PROVIDERS[currentProvider].name} API key not set.`);

    let prompt = "";
    const role = "You are an expert Technical Writer. Write a specific section for a GitHub README.md.";

    switch (type) {
        case 'description':
            prompt = `${role}
            **Goal**: Write a compelling "About" section.
            **Context**: ${context}
            **Rules**:
            - Focus on the **Value Proposition**.
            - Use 2-3 concise paragraphs.
            - Use active voice (e.g., "Automates your workflow" vs "This tool is for automating...").`;
            break;
        case 'installation':
            prompt = `${role}
            **Goal**: Write a "Getting Started" or "Installation" guide.
            **Context**: ${context}
            **Rules**:
            - Use step-by-step numbering (1., 2., 3.).
            - Use \`bash\` code blocks for all terminal commands.
            - Include "Prerequisites" if applicable (e.g., Node.js, Python).`;
            break;
        case 'usage':
            prompt = `${role}
            **Goal**: Write a "Usage" section.
            **Context**: ${context}
            **Rules**:
            - Provide a **Real-World Example**.
            - If code: Use syntax highlighting (e.g., \`\`\`javascript).
            - If app: Describe the primary user flow.`;
            break;
        case 'features':
            prompt = `${role}
            **Goal**: List the Key Features.
            **Context**: ${context}
            **Rules**:
            - Use a bulleted list.
            - Format: "Emoji **Feature Name**: Description".
            - Focus on **Benefits**, not just technical specs.`;
            break;
        case 'faq':
            prompt = `${role}
            **Goal**: Write a FAQ section.
            **Rules**:
            - Create 3-5 realistic questions developers might ask.
            - Use "### Question" for headers.
            - Keep answers helpful and friendly.`;
            break;
        default:
            prompt = `${role} Generate content for a section of type "${type}". Context: ${context}`;
    }

    return generateText(prompt);
};
