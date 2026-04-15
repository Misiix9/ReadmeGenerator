import React, { useState, useEffect } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { configureAI, PROVIDERS } from '../services/ai';

const DEFAULT_PROVIDER = 'google';
const DEFAULT_KEYS = { google: '', openai: '', anthropic: '' };
const getValidModelForProvider = (provider, candidateModel) => {
    const models = PROVIDERS[provider].models;
    return candidateModel && models.includes(candidateModel) ? candidateModel : models[0];
};

const loadStoredSettings = () => {
    const settings = {
        provider: DEFAULT_PROVIDER,
        model: PROVIDERS[DEFAULT_PROVIDER].models[0],
        keys: { ...DEFAULT_KEYS }
    };

    try {
        const storedProvider = localStorage.getItem('ai_provider');
        if (storedProvider && PROVIDERS[storedProvider]) {
            settings.provider = storedProvider;
        }

        const rawKeys = localStorage.getItem('ai_keys');
        if (rawKeys) {
            try {
                const parsedKeys = JSON.parse(rawKeys);
                if (parsedKeys && typeof parsedKeys === 'object' && !Array.isArray(parsedKeys)) {
                    settings.keys = {
                        ...DEFAULT_KEYS,
                        ...Object.fromEntries(
                            Object.entries(parsedKeys).filter(
                                ([key, value]) => key in DEFAULT_KEYS && typeof value === 'string'
                            )
                        )
                    };
                }
            } catch {
                localStorage.removeItem('ai_keys');
            }
        }

        const storedModel = localStorage.getItem('ai_model');
        settings.model = getValidModelForProvider(settings.provider, storedModel);
    } catch (error) {
        console.warn('Failed to read AI settings from browser storage:', error);
    }

    return settings;
};

const SettingsModal = ({ isOpen, onClose }) => {
    const [initialSettings] = useState(() => loadStoredSettings());
    const [provider, setProvider] = useState(initialSettings.provider);
    const [model, setModel] = useState(initialSettings.model);
    const [keys, setKeys] = useState(initialSettings.keys);

    useEffect(() => {
        configureAI(initialSettings.provider, initialSettings.model, initialSettings.keys);
    }, []);

    const handleProviderChange = (nextProvider) => {
        if (!PROVIDERS[nextProvider]) return;
        setProvider(nextProvider);
        setModel((currentModel) =>
            getValidModelForProvider(nextProvider, currentModel)
        );
    };

    const handleSave = () => {
        configureAI(provider, model, keys);
        onClose();

        try {
            localStorage.setItem('ai_provider', provider);
            localStorage.setItem('ai_model', model);
            localStorage.setItem('ai_keys', JSON.stringify(keys));
            alert('Settings saved successfully!');
        } catch (error) {
            console.warn('Failed to persist AI settings to browser storage:', error);
            alert('Settings applied for this session, but could not be saved in browser storage.');
        }
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
                            onChange={(e) => handleProviderChange(e.target.value)}
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
