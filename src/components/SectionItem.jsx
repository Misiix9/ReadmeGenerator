
import React from 'react';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderEditor from './editors/HeaderEditor';
import TextEditor from './editors/TextEditor';
import ImageEditor from './editors/ImageEditor';
import CodeEditor from './editors/CodeEditor';
import BadgeGenerator from './generators/BadgeGenerator';
import TableBuilder from './generators/TableBuilder';

const SectionItem = ({ section, onRemove, onToggle, onUpdate, dragListeners }) => {
    const renderEditor = () => {
        const props = {
            content: section.content,
            onChange: (newContent) => onUpdate(section.id, newContent),
        };

        switch (section.type) {
            case 'header':
                return <HeaderEditor {...props} />;
            case 'text':
                return <TextEditor {...props} />;
            case 'image':
                return <ImageEditor {...props} />;
            case 'code':
                return <CodeEditor {...props} />;
            case 'badge':
                return <BadgeGenerator {...props} />;
            case 'table':
                return <TableBuilder {...props} />;
            default:
                return <div className="text-gray-500">Unknown section type</div>;
        }
    };

    return (
        <div className="bg-surface border border-white/10 rounded-lg overflow-hidden mb-3 shadow-sm group">
            <div className="flex items-center p-3 bg-surface/50 border-b border-white/5">
                <button
                    {...dragListeners}
                    className="p-1 mr-2 text-gray-500 hover:text-gray-300 cursor-grab active:cursor-grabbing"
                >
                    <GripVertical className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold uppercase text-gray-400 w-16">
                    {section.type}
                </span>
                <div className="flex-1 ml-2 text-sm font-medium truncate text-white">
                    {section.content.title || section.content.text || section.content.url || 'Untitled Section'}
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onToggle(section.id)}
                        className="p-1 text-gray-500 hover:text-white transition-colors"
                    >
                        {section.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => onRemove(section.id)}
                        className="p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {section.isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-background/50 border-t border-white/5">
                            {renderEditor()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SectionItem;

