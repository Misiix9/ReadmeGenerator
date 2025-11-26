import React from 'react';
import Input from './Input';

const ImageEditor = ({ content, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <Input
                label="Image URL"
                value={content.url}
                onChange={(val) => handleChange('url', val)}
                placeholder="https://example.com/image.png"
            />
            <Input
                label="Alt Text"
                value={content.alt}
                onChange={(val) => handleChange('alt', val)}
                placeholder="Description of the image"
            />
        </div>
    );
};

export default ImageEditor;
