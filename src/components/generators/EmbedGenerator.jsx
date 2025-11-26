import React, { useState } from 'react';
import { Box, Code } from 'lucide-react';

const EmbedGenerator = ({ onAdd }) => {
    const [url, setUrl] = useState('');
    const [type, setType] = useState('codesandbox');

    const handleAdd = () => {
        if (!url) return;

        let embedCode = '';
        if (type === 'codesandbox') {
            const embedUrl = url.replace('codesandbox.io/s/', 'codesandbox.io/embed/');
            embedCode = `<iframe src="${embedUrl}?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="CodeSandbox Embed"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>`;
        } else if (type === 'stackblitz') {
            embedCode = `<iframe src="${url}?embed=1&file=index.js"
        style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
        title="StackBlitz Embed"
        ></iframe>`;
        }

        // Add as HTML code block
        onAdd('code', { code: embedCode, language: 'html' });
        setUrl('');
    };

    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <Box className="w-5 h-5 text-cyan-400" />
                Interactive Embed
            </div>

            <div className="flex gap-2 mb-2">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-background border border-white/10 rounded px-2 py-1 text-sm text-white focus:border-cyan-500 outline-none"
                >
                    <option value="codesandbox">CodeSandbox</option>
                    <option value="stackblitz">StackBlitz</option>
                </select>
            </div>

            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`Paste ${type === 'codesandbox' ? 'CodeSandbox' : 'StackBlitz'} URL`}
                className="w-full bg-background border border-white/10 rounded px-2 py-2 text-sm text-white focus:border-cyan-500 outline-none mb-2"
            />

            <button
                onClick={handleAdd}
                disabled={!url}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
                Add Embed
            </button>
        </div>
    );
};

export default EmbedGenerator;
