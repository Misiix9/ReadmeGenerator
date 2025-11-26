import React, { useState, useRef, useEffect } from 'react';
import { Download, Palette, Type, Image as ImageIcon } from 'lucide-react';

const BannerDesigner = ({ onAdd }) => {
    const canvasRef = useRef(null);
    const [text, setText] = useState('Project Name');
    const [bgColor1, setBgColor1] = useState('#4f46e5');
    const [bgColor2, setBgColor2] = useState('#9333ea');
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(60);

    useEffect(() => {
        drawBanner();
    }, [text, bgColor1, bgColor2, textColor, fontSize]);

    const drawBanner = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Dimensions
        canvas.width = 1200;
        canvas.height = 400;

        // Background Gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, bgColor1);
        gradient.addColorStop(1, bgColor2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    };

    const handleAddToReadme = () => {
        const canvas = canvasRef.current;
        // In a real app, we'd upload this to a host (Imgur, S3).
        // For this demo, we'll use the data URI, though it's large for markdown.
        // Alternatively, we could just generate a placeholder URL like https://placehold.co
        const dataUrl = canvas.toDataURL('image/png');

        // Create an Image section
        onAdd('image', { url: dataUrl, alt: text });
    };

    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <ImageIcon className="w-5 h-5 text-pink-400" />
                Banner Designer
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Font Size</label>
                    <input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full bg-background border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Gradient Start</label>
                    <input
                        type="color"
                        value={bgColor1}
                        onChange={(e) => setBgColor1(e.target.value)}
                        className="w-full h-8 bg-transparent border-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Gradient End</label>
                    <input
                        type="color"
                        value={bgColor2}
                        onChange={(e) => setBgColor2(e.target.value)}
                        className="w-full h-8 bg-transparent border-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="mb-4 border border-white/10 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-auto block" />
            </div>

            <button
                onClick={handleAddToReadme}
                className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
                Add Banner to Readme
            </button>
        </div>
    );
};

export default BannerDesigner;
