import React from 'react';
import Input from './Input';
import Textarea from './Textarea';

const HeaderEditor = ({ content, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <Input
                label="Project Title"
                value={content.title}
                onChange={(val) => handleChange('title', val)}
                placeholder="My Awesome Project"
            />
            <Textarea
                label="Description"
                value={content.description}
                onChange={(val) => handleChange('description', val)}
                placeholder="A brief description of what this project does..."
            />
        </div>
    );
};

export default HeaderEditor;
