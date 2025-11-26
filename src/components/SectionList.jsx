import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import SectionItem from './SectionItem';
import { Plus, Image, Code, Type } from 'lucide-react';

const SectionList = ({ sections, onAdd, onRemove, onToggle, onReorder, onUpdate }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            onReorder(active.id, over.id);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Sections</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => onAdd('text')}
                        className="p-1.5 bg-surface hover:bg-surface/80 rounded-md border border-white/10 transition-colors"
                        title="Add Text Section"
                    >
                        <Type className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onAdd('image')}
                        className="p-1.5 bg-surface hover:bg-surface/80 rounded-md border border-white/10 transition-colors"
                        title="Add Image Section"
                    >
                        <Image className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onAdd('code')}
                        className="p-1.5 bg-surface hover:bg-surface/80 rounded-md border border-white/10 transition-colors"
                        title="Add Code Section"
                    >
                        <Code className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onAdd('badge')}
                        className="p-1.5 bg-surface hover:bg-surface/80 rounded-md border border-white/10 transition-colors"
                        title="Add Badge"
                    >
                        <span className="text-xs font-bold">B</span>
                    </button>
                    <button
                        onClick={() => onAdd('table')}
                        className="p-1.5 bg-surface hover:bg-surface/80 rounded-md border border-white/10 transition-colors"
                        title="Add Table"
                    >
                        <span className="text-xs font-bold">T</span>
                    </button>
                </div>
            </div>


            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sections}
                    strategy={verticalListSortingStrategy}
                >
                    {sections.map((section) => (
                        <SortableItem key={section.id} id={section.id}>
                            <SectionItem
                                section={section}
                                onRemove={onRemove}
                                onToggle={onToggle}
                                onUpdate={onUpdate}
                            />
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>

            {
                sections.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-lg text-gray-500">
                        <p>No sections yet.</p>
                        <button onClick={() => onAdd('header')} className="text-primary hover:underline mt-2">Add a Header</button>
                    </div>
                )
            }
        </div >
    );
};

export default SectionList;
