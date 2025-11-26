import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css/github-markdown-dark.css';
import { generateMarkdown } from '../utils/markdownGenerator';

const Preview = ({ sections }) => {
    const markdown = useMemo(() => generateMarkdown(sections), [sections]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-4 pb-4 border-b border-white/10 flex items-center justify-between shrink-0">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {markdown.length} chars
                </span>
            </div>

            <div className="flex-1 overflow-auto bg-[#0d1117] rounded-lg border border-white/10 p-8">
                <div className="markdown-body" style={{ backgroundColor: 'transparent' }}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            // Ensure links open in new tab
                            a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Preview;
