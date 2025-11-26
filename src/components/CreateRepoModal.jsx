import React, { useState } from 'react';
import { Github, Loader2, Plus, Lock, Globe } from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub';

const CreateRepoModal = ({ isOpen, onClose, onCreate }) => {
    const { createRepository } = useGitHub();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setLoading(true);
        try {
            const repo = await createRepository(name, description, isPrivate);
            onCreate(repo);
            onClose();
            alert(`Repository ${repo.name} created successfully!`);
        } catch (error) {
            console.error("Create repo failed:", error);
            alert(`Failed to create repository: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-surface border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Github className="w-6 h-6" />
                        Create Repository
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Repository Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., awesome-project"
                            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description of your project"
                            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary outline-none h-24 resize-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setIsPrivate(false)}
                            className={`flex-1 p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${!isPrivate ? 'bg-primary/20 border-primary text-white' : 'bg-background border-white/10 text-gray-400 hover:bg-white/5'}`}
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-sm font-medium">Public</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsPrivate(true)}
                            className={`flex-1 p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${isPrivate ? 'bg-primary/20 border-primary text-white' : 'bg-background border-white/10 text-gray-400 hover:bg-white/5'}`}
                        >
                            <Lock className="w-5 h-5" />
                            <span className="text-sm font-medium">Private</span>
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        Create Repository
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRepoModal;
