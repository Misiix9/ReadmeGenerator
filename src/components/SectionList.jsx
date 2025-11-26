import React, { useState } from 'react';
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
import { Plus, Type, Image, Code, Hash, Shield, Table, Palette, Network, BarChart3, Scale, Box } from 'lucide-react';
import RepoAnalyzer from './generators/RepoAnalyzer';
import BannerDesigner from './editors/BannerDesigner';
import MermaidEditor from './generators/MermaidEditor';
import BadgePicker from './generators/BadgePicker';
import StatsGenerator from './generators/StatsGenerator';
import LicensePicker from './generators/LicensePicker';
import EmbedGenerator from './generators/EmbedGenerator';

const SectionList = ({ sections, onRemove, onToggle, onUpdate, onReorder, onAdd }) => {
    const [activeTool, setActiveTool] = useState(null); // 'banner', 'mermaid', 'badge', 'stats', 'license', 'embed'

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
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-white/10 space-y-4">
                <h2 className="text-lg font-semibold text-white">Tools & Generators</h2>

                {/* Tool Toggles */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTool(activeTool === 'banner' ? null : 'banner')}
                        className={`p-2 rounded-lg border transition-colors ${activeTool === 'banner' ? 'bg-pink-500/20 border-pink-500 text-pink-400' : 'bg-surface border-white/10 text-gray-400 hover:text-white'}`}
                        title="Banner Designer"
                    >
                        <Palette className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTool(activeTool === 'mermaid' ? null : 'mermaid')}
                        className={`p-2 rounded-lg border transition-colors ${activeTool === 'mermaid' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-surface border-white/10 text-gray-400 hover:text-white'}`}
                        title="Mermaid Diagram"
                    >
                        <Network className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTool(activeTool === 'badge' ? null : 'badge')}
                        className={`p-2 rounded-lg border transition-colors ${activeTool === 'badge' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-surface border-white/10 text-gray-400 hover:text-white'}`}
                        title="Badge Picker"
                    >
                        <Shield className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTool(activeTool === 'stats' ? null : 'stats')}
                        className={`p-2 rounded-lg border transition-colors ${activeTool === 'stats' ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-surface border-white/10 text-gray-400 hover:text-white'}`}
                        title="Download Stats"
                    >
                        <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTool(activeTool === 'license' ? null : 'license')}
                        className={`p-2 rounded-lg border transition-colors ${activeTool === 'license' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-surface border-white/10 text-gray-400 hover:text-white'}`}
                        title="License Picker"
                    >
                        <Scale className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTool(activeTool === 'embed' ? null : 'embed')}
                        className={`p-2 rounded-lg border transition-colors ${activeTool === 'embed' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-surface border-white/10 text-gray-400 hover:text-white'}`}
                        title="Interactive Embed"
                    >
                        <Box className="w-4 h-4" />
                    </button>
                </div>

                {/* Active Tool Area */}
                {activeTool === 'banner' && <BannerDesigner onAdd={(type, content) => { onAdd(type, content); setActiveTool(null); }} />}
                {activeTool === 'mermaid' && <MermaidEditor onAdd={(type, content) => { onAdd(type, content); setActiveTool(null); }} />}
                {activeTool === 'badge' && <BadgePicker onAdd={(type, content) => { onAdd(type, content); setActiveTool(null); }} />}
                {activeTool === 'stats' && <StatsGenerator onAdd={(type, content) => { onAdd(type, content); setActiveTool(null); }} />}
                {activeTool === 'license' && <LicensePicker onAdd={(type, content) => { onAdd(type, content); setActiveTool(null); }} />}
                {activeTool === 'embed' && <EmbedGenerator onAdd={(type, content) => { onAdd(type, content); setActiveTool(null); }} />}

                <RepoAnalyzer onAdd={onAdd} />

                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-6 mb-2">Add Section</h3>
                <div className="grid grid-cols-2 gap-2">
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
