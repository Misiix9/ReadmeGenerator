import React, { useState } from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import Textarea from './Textarea';
import { generateSectionContent } from '../../services/ai';

const TextEditor = ({ content, onChange }) => {
    const [generating, setGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);

    const handleChange = (field, value) => {
        onChange({ ...content, [field]: value });
    };

    const handleGenerate = async () => {
        if (!prompt) return;
        setGenerating(true);
        try {
            const text = await generateSectionContent('text', prompt);
            handleChange('text', text);
            setShowPrompt(false);
            setPrompt('');
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Generation failed. Check API Key.");
        }
        setGenerating(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                    <Sparkles className="w-3 h-3" />
                    {showPrompt ? 'Cancel AI' : 'AI Write'}
                </button>
            </div>

            {showPrompt && (
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what you want to write..."
                        className="w-full bg-background border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none mb-2"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={generating || !prompt}
                        className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded text-xs font-medium transition-colors disabled:opacity-50"
                    >
                        {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        Generate
                    </button>
                </div>
            )}

            <Textarea
                label="Content"
                value={content.text}
                onChange={(val) => handleChange('text', val)}
                placeholder="Write your paragraph here..."
                rows={6}
            />
        </div>
    );
};

export default TextEditor;
