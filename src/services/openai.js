let apiKey = null;
let model = 'gpt-4o';

export const initialize = (key, modelName) => {
    apiKey = key;
    model = modelName;
};

export const generateText = async (prompt) => {
    if (!apiKey) throw new Error("OpenAI API key not set.");

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "OpenAI API Error");
    }

    const data = await response.json();
    return data.choices[0].message.content;
};
