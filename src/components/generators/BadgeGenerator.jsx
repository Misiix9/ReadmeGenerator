import React, { useEffect } from 'react';
import Input from '../editors/Input';

const BadgeGenerator = ({ content, onChange }) => {
    const handleChange = (field, value) => {
        const newContent = { ...content, [field]: value };
        onChange(newContent);
    };

    // Construct the shields.io URL
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
        content.label || 'Label'
    )}-${encodeURIComponent(content.message || 'Message')}-${content.color || 'blue'
        }`;

    // Update the stored URL whenever inputs change
    useEffect(() => {
        if (content.url !== badgeUrl) {
            onChange({ ...content, url: badgeUrl });
        }
    }, [content.label, content.message, content.color]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Label"
                    value={content.label}
                    onChange={(val) => handleChange('label', val)}
                    placeholder="License"
                />
                <Input
                    label="Message"
                    value={content.message}
                    onChange={(val) => handleChange('message', val)}
                    placeholder="MIT"
                />
            </div>
            <Input
                label="Color"
                value={content.color}
                onChange={(val) => handleChange('color', val)}
                placeholder="green"
            />

            <div className="mt-4 p-4 bg-surface/50 rounded-lg border border-white/10 flex flex-col items-center justify-center gap-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Preview</span>
                <img src={badgeUrl} alt="Badge Preview" className="h-6" />
            </div>
        </div>
    );
};

export default BadgeGenerator;
