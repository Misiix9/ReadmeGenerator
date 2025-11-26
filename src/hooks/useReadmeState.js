import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export const useReadmeState = () => {
    const [sections, setSections] = useState([
        {
            id: 'header-1',
            type: 'header',
            isOpen: true,
            content: {
                title: 'Project Title',
                description: 'A brief description of your project.',
            },
        },
    ]);

    const addSection = (type, initialContent = {}) => {
        let defaultContent = {};
        switch (type) {
            case 'header':
                defaultContent = { title: '', description: '' };
                break;
            case 'text':
                defaultContent = { text: '' };
                break;
            case 'image':
                defaultContent = { url: '', alt: '' };
                break;
            case 'code':
                defaultContent = { code: '', language: 'javascript' };
                break;
            case 'badge':
                defaultContent = { label: 'License', message: 'MIT', color: 'green' };
                break;
            case 'table':
                defaultContent = { rows: [['Header 1', 'Header 2'], ['Data 1', 'Data 2']] };
                break;
            default:
                defaultContent = {};
        }

        const newSection = {
            id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            isOpen: true,
            content: { ...defaultContent, ...initialContent },
        };
        setSections((prev) => [...prev, newSection]);
    };

    const removeSection = (id) => {
        setSections(sections.filter((s) => s.id !== id));
    };

    const updateSection = (id, newContent) => {
        setSections(
            sections.map((s) =>
                s.id === id ? { ...s, content: { ...s.content, ...newContent } } : s
            )
        );
    };

    const toggleSection = (id) => {
        setSections(
            sections.map((s) => (s.id === id ? { ...s, isOpen: !s.isOpen } : s))
        );
    };

    const reorderSections = (activeId, overId) => {
        setSections((prev) => {
            const oldIndex = prev.findIndex((s) => s.id === activeId);
            const newIndex = prev.findIndex((s) => s.id === overId);
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    return {
        sections,
        setSections, // Expose this for imports
        addSection,
        removeSection,
        updateSection,
        toggleSection,
        reorderSections,
    };
};

