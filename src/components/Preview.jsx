import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateMarkdown } from '../utils/markdownGenerator';

const Preview = ({ sections }) => {
    const markdown = useMemo(() => generateMarkdown(sections), [sections]);

    return (
        <div className="w-full">
            <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {markdown.length} chars
                </span>
            </div>

            <div className="prose prose-invert max-w-none prose-headings:border-b prose-headings:border-white/10 prose-headings:pb-2 prose-pre:bg-surface prose-pre:border prose-pre:border-white/10 prose-img:rounded-lg">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};

export default Preview;
