import React, { useState, useEffect } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { configureAI, PROVIDERS } from '../services/ai';

const SettingsModal = ({ isOpen, onClose }) => {
    const [provider, setProvider] = useState('google');
    const [model, setModel] = useState('gemini-1.5-pro');
    const [keys, setKeys] = useState({ google: '', openai: '', anthropic: '' });

    useEffect(() => {
        const storedProvider = localStorage.getItem('ai_provider') || 'google';
        const storedModel = localStorage.getItem('ai_model') || 'gemini-1.5-pro';
        const storedKeys = JSON.parse(localStorage.getItem('ai_keys') || '{}');

        setProvider(storedProvider);
        setModel(storedModel);
        setKeys({ google: '', openai: '', anthropic: '', ...storedKeys });

        // Initialize AI on load
        configureAI(storedProvider, storedModel, storedKeys);
    }, []);

    // Update model when provider changes
    useEffect(() => {
        if (PROVIDERS[provider] && !PROVIDERS[provider].models.includes(model)) {
            setModel(PROVIDERS[provider].models[0]);
        }
    }, [provider]);

    const handleSave = () => {
        localStorage.setItem('ai_provider', provider);
        localStorage.setItem('ai_model', model);
        localStorage.setItem('ai_keys', JSON.stringify(keys));

        configureAI(provider, model, keys);
        onClose();
        alert('Settings saved successfully!');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-surface border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings className="w-6 h-6" />
                        AI Settings
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Provider Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">AI Provider</label>
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary outline-none"
                        >
                            {Object.entries(PROVIDERS).map(([key, val]) => (
                                <option key={key} value={key}>{val.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Model Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Model</label>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary outline-none"
                        >
                            {PROVIDERS[provider].models.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    {/* API Key Input (Dynamic) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            {PROVIDERS[provider].name} API Key
                        </label>
                        <input
                            type="password"
                            value={keys[provider]}
                            onChange={(e) => setKeys({ ...keys, [provider]: e.target.value })}
                            placeholder={`Enter your ${PROVIDERS[provider].name} API Key`}
                            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Keys are stored locally in your browser.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        <Save className="w-5 h-5" />
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
