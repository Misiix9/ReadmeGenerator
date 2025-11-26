import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative',
        opacity: isDragging ? 0.8 : 1,
        scale: isDragging ? 1.02 : 1,
        boxShadow: isDragging ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {/* Pass listeners to the drag handle inside children, or wrap here if handle is external */}
            {React.cloneElement(children, { dragListeners: listeners })}
        </div>
    );
};

export default SortableItem;
