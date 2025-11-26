import React, { useState, useEffect } from 'react';
import { Github, Loader2, Download, FileCode, Plus, Check } from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub';
import CreateRepoModal from './CreateRepoModal';

const RepoPicker = ({ onImport, onSelect, onClose, mode = 'import' }) => {
    const { user, login, fetchRepositories, fetchFileContent } = useGitHub();
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [importing, setImporting] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        if (user) {
            loadRepos();
        }
    }, [user]);

    const loadRepos = async () => {
        setLoading(true);
        try {
            const data = await fetchRepositories();
            setRepos(data);
        } catch (error) {
            console.error("Failed to load repos:", error);
        }
        setLoading(false);
    };

    const handleAction = async () => {
        if (!selectedRepo) return;

        if (mode === 'select') {
            onSelect(selectedRepo);
            onClose();
            return;
        }

        // Import Mode
        setImporting(true);
        try {
            const content = await fetchFileContent(selectedRepo.full_name, 'README.md');
            if (content) {
                onImport(content);
                onClose();
            } else {
                alert('No README.md found in this repository.');
            }
        } catch (error) {
            console.error("Import failed:", error);
            alert("Failed to import README.");
        }
        setImporting(false);
    };

    const handleRepoCreated = (newRepo) => {
        setRepos([newRepo, ...repos]);
        setSelectedRepo(newRepo);
    };

    if (!user) {
        return (
            <div className="p-8 text-center">
                <Github className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Connect to GitHub</h3>
                <p className="text-gray-400 mb-6">Sign in to access your repositories.</p>
                <button
                    onClick={login}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
                >
                    Login with GitHub
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    {mode === 'select' ? 'Select Repository' : 'Import from GitHub'}
                </h2>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Repository
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {repos.map((repo) => (
                            <button
                                key={repo.id}
                                onClick={() => setSelectedRepo(repo)}
                                className={`p-3 rounded-lg border text-left transition-all ${selectedRepo?.id === repo.id
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-surface border-white/10 text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                <div className="font-medium truncate">{repo.name}</div>
                                <div className="text-xs text-gray-500 truncate">{repo.full_name}</div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAction}
                            disabled={!selectedRepo || importing}
                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === 'select' ? <Check className="w-4 h-4" /> : <FileCode className="w-4 h-4" />)}
                            {mode === 'select' ? 'Select Repository' : 'Import README'}
                        </button>
                    </div>
                </div>
            )}

            <CreateRepoModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onCreate={handleRepoCreated}
            />
        </div>
    );
};

export default RepoPicker;
