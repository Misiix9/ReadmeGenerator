import React, { useState } from 'react';
import { Download, Copy, Github, Check, Loader2 } from 'lucide-react';
import { generateMarkdown } from '../utils/markdownGenerator';
import { useGitHub } from '../hooks/useGitHub';

const ExportMenu = ({ sections }) => {
    const [copied, setCopied] = useState(false);
    const [pushing, setPushing] = useState(false);
    const { user, login, pushToRepo } = useGitHub();

    const handleCopy = async () => {
        const markdown = generateMarkdown(sections);
        try {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        const markdown = generateMarkdown(sections);
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePush = async () => {
        if (!user) {
            login();
            return;
        }

        const markdown = generateMarkdown(sections);
        setPushing(true);
        // Mock repo selection for now
        const repo = prompt("Enter repository name (e.g., username/repo):", "my-project");
        if (repo) {
            await pushToRepo(repo, markdown);
            alert("Successfully pushed to GitHub (Mock)!");
        }
        setPushing(false);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Copy to Clipboard"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">Copy</span>
            </button>

            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Download README.md"
            >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
            </button>

            <button
                onClick={handlePush}
                disabled={pushing}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {pushing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Github className="w-4 h-4" />
                )}
                <span>{user ? 'Push' : 'Login & Push'}</span>
            </button>
        </div>
    );
};

export default ExportMenu;
