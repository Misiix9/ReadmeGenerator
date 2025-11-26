import React, { useState } from 'react';
import { Wand2, Loader2, Check } from 'lucide-react';
import { analyzeRepo } from '../../services/gemini';
import { useReadmeState } from '../../hooks/useReadmeState';

const RepoAnalyzer = () => {
    const { addSection } = useReadmeState();
    const [analyzing, setAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        try {
            // Mock file tree for now since we don't have full GitHub API access yet
            const mockFileTree = ['src/', 'package.json', 'README.md', 'public/'];
            const mockContents = {
                'package.json': JSON.stringify({
                    name: "readme-generator",
                    dependencies: { react: "^18.0.0", firebase: "^9.0.0" }
                })
            };

            const result = await analyzeRepo(mockFileTree, mockContents);

            if (result.features) {
                addSection('text'); // Add Features section
                // Note: In a real app we'd update the content immediately, 
                // but for now we just add the section type. 
                // We'll improve this integration in the next step.
                console.log("Analysis Result:", result);
                alert(`Analysis Complete! Found ${result.features.length} features.`);
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
            </div>
            <p className="text-xs text-gray-400 mb-3">
                Analyze your project structure to auto-generate sections.
            </p>
            <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-md transition-colors text-sm font-medium border border-purple-500/20"
            >
                {analyzing ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    <>
                        <Wand2 className="w-4 h-4" />
                        Analyze Repository
                    </>
                )}
            </button>
        </div>
    );
};

export default RepoAnalyzer;
