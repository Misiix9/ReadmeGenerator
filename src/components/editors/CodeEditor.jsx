import React from 'react';
import Textarea from './Textarea';
import Input from './Input';

const CodeEditor = ({ content, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <Input
                label="Language"
                value={content.language}
                onChange={(val) => handleChange('language', val)}
                placeholder="javascript"
            />
            <Textarea
                label="Code Snippet"
                value={content.code}
                onChange={(val) => handleChange('code', val)}
                placeholder="console.log('Hello World');"
                rows={8}
            />
        </div>
    );
};

export default CodeEditor;
