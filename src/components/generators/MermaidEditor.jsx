import React, { useState, useEffect } from 'react';
import { Network, Play } from 'lucide-react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true, theme: 'dark' });

const MermaidEditor = ({ onAdd }) => {
    const [code, setCode] = useState(`graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Great!]
    B -- No --> D[Debug]`);
    const [svg, setSvg] = useState('');

    useEffect(() => {
        renderDiagram();
    }, [code]);

    const renderDiagram = async () => {
        try {
            const { svg } = await mermaid.render('mermaid-preview-' + Date.now(), code);
            setSvg(svg);
        } catch (error) {
            console.error('Mermaid render error:', error);
            // Mermaid throws errors for invalid syntax, which is expected while typing
        }
    };

    const handleAdd = () => {
        // Add as a code block with 'mermaid' language
        onAdd('code', { code, language: 'mermaid' });
    };

    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <Network className="w-5 h-5 text-blue-400" />
                Mermaid Diagram
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Mermaid Syntax</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-40 bg-background border border-white/10 rounded p-2 text-xs font-mono text-white resize-none focus:border-blue-500 outline-none"
                    />
                </div>
                <div className="bg-white/5 border border-white/10 rounded p-2 flex items-center justify-center overflow-hidden">
                    {svg ? (
                        <div dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full max-h-40" />
                    ) : (
                        <span className="text-xs text-gray-500">Preview</span>
                    )}
                </div>
            </div>

            <button
                onClick={handleAdd}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
                Add Diagram to Readme
            </button>
        </div>
    );
};

export default MermaidEditor;
