import React, { useState } from 'react';
import { Wand2, Loader2, Check, Github } from 'lucide-react';
import { analyzeRepo } from '../../services/ai';
import { useGitHub } from '../../hooks/useGitHub';
import RepoPicker from '../RepoPicker';

const RepoAnalyzer = ({ onAdd }) => {
    // const { addSection } = useReadmeState(); // Removed local state hook
    const { fetchFileTree, fetchFileContent } = useGitHub();
    const [analyzing, setAnalyzing] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleAnalyze = async () => {
        if (!selectedRepo) {
            setIsPickerOpen(true);
            return;
        }

        setAnalyzing(true);
        try {
            // 1. Fetch File Tree
            const fileTree = await fetchFileTree(selectedRepo.full_name);

            // 2. Fetch Critical Context Files
            const CRITICAL_FILES = [
                'package.json', 'vite.config.js', 'next.config.js', // Node/Web
                'requirements.txt', 'pyproject.toml', 'setup.py',   // Python
                'go.mod', 'Cargo.toml',                             // Go/Rust
                'Dockerfile', 'docker-compose.yml',                 // DevOps
                'index.html', 'netlify.toml', 'vercel.json'         // Static/Deploy
            ];

            const contents = {};
            // Fetch up to 3 critical files to avoid rate limits/slowdown
            const filesToFetch = fileTree.filter(f => CRITICAL_FILES.includes(f)).slice(0, 3);

            await Promise.all(filesToFetch.map(async (file) => {
                const content = await fetchFileContent(selectedRepo.full_name, file);
                if (content) contents[file] = content;
            }));

            // 3. Analyze with AI (Multi-Model)
            const result = await analyzeRepo(fileTree, contents);

            if (result) {
                // Clear existing sections (optional, but good for "Auto-Create")
                // For now, we append.

                // 1. Header
                onAdd('header', {
                    title: result.title || selectedRepo.name,
                    description: result.description || selectedRepo.description
                });

                // 2. Badges (License)
                if (result.license) {
                    onAdd('badge', {
                        url: `https://img.shields.io/badge/license-${result.license}-blue.svg`,
                        label: 'License'
                    });
                }

                // 3. Features
                if (result.features && result.features.length > 0) {
                    onAdd('text', {
                        title: 'Features',
                        text: result.features.map(f => `- ${f}`).join('\n')
                    });
                }

                // 4. Tech Stack
                if (result.techStack && result.techStack.length > 0) {
                    onAdd('text', {
                        title: 'Tech Stack',
                        text: result.techStack.map(t => `- ${t}`).join('\n')
                    });
                }

                // 5. Installation / Development
                if (result.installation) {
                    const installTitle = result.projectType === 'Web Application' ? 'Local Development' : 'Installation';
                    onAdd('code', {
                        title: installTitle,
                        code: result.installation,
                        language: 'bash'
                    });
                }

                // 6. Usage
                if (result.usage) {
                    onAdd('code', {
                        title: 'Usage',
                        code: result.usage,
                        language: 'javascript'
                    });
                }

                alert(`Analysis Complete! Generated full README for ${selectedRepo.name}.`);
            }
        } catch (error) {
            console.error("Analysis failed:", error);
            alert("Analysis failed. Check console and API Key.");
        }
        setAnalyzing(false);
    };

    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-purple-400" />
                    AI Repo Analyzer
                </h3>
                {selectedRepo && (
                    <button
                        onClick={() => setSelectedRepo(null)}
                        className="text-xs text-gray-500 hover:text-white"
                    >
                        Change
                    </button>
                )}
            </div>

            {selectedRepo ? (
                <div className="flex items-center gap-2 mb-3 p-2 bg-white/5 rounded border border-white/10">
                    <Github className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-white truncate">{selectedRepo.full_name}</span>
                </div>
            ) : (
                <p className="text-xs text-gray-400 mb-3">
                    Select a repository to auto-generate a complete README.
                </p>
            )}

            <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-md transition-colors text-sm font-medium border border-purple-500/20"
            >
                {analyzing ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Wand2 className="w-4 h-4" />
                        {selectedRepo ? 'Generate README' : 'Select Repository'}
                    </>
                )}
            </button>

            {isPickerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-surface border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                        <RepoPicker
                            mode="select"
                            onSelect={(repo) => setSelectedRepo(repo)}
                            onClose={() => setIsPickerOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoAnalyzer;
