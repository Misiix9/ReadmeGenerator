import React from 'react';
import Textarea from './Textarea';

const TextEditor = ({ content, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <Textarea
                label="Content"
                value={content.text}
                onChange={(val) => handleChange('text', val)}
                placeholder="Write your paragraph here..."
                rows={6}
            />
        </div>
    );
};

export default TextEditor;
