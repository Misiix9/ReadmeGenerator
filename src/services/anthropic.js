let apiKey = null;
let model = 'claude-3-5-sonnet-20240620';

export const initialize = (key, modelName) => {
    apiKey = key;
    model = modelName;
};

export const generateText = async (prompt) => {
    if (!apiKey) throw new Error("Anthropic API key not set.");

    // Note: Anthropic API usually requires a proxy or backend due to CORS if called from browser.
    // However, for this demo we will attempt direct call. If CORS fails, user might need a proxy.
    // Many users use a local proxy or "dangerously allow browser" settings for dev tools.

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'dangerously-allow-browser': 'true' // Required for client-side calls
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 4096,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Anthropic API Error");
    }

    const data = await response.json();
    return data.content[0].text;
};
