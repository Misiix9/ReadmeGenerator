import React from 'react';

const SplitScreen = ({ leftPanel, rightPanel }) => {
    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-4rem)] overflow-hidden">
            {/* Left Panel - Editor */}
            <div className="h-full overflow-y-auto border-r border-white/10 bg-surface/30 p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="max-w-2xl mx-auto space-y-6">
                    {leftPanel}
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="h-full overflow-y-auto bg-background p-8 md:p-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="max-w-3xl mx-auto prose prose-invert prose-pre:bg-surface prose-pre:border prose-pre:border-white/10">
                    {rightPanel}
                </div>
            </div>
        </div>
    );
};

export default SplitScreen;
