import React from 'react';
import { _cs } from '@togglecorp/fujs';

import type { Props as DraggableContentProps } from '../DraggableContent';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
    onDrop?: (value?: DraggableContentProps['value']) => void;
    dropOverlayContainerClassName?: string;
    dropOverlayContent?: React.ReactNode;
    draggedOverClassName?: string;
}

function DropContaier(props: Props) {
    const {
        className,
        children,
        onDrop,
        dropOverlayContainerClassName,
        dropOverlayContent = 'Drop content here',
        draggedOverClassName,
    } = props;

    const [isBeingDraggedOver, setIsBeingDraggedOver] = React.useState(false);
    const dragEnterRef = React.useRef(0);

    const handleDragEnter = React.useCallback(() => {
        if (dragEnterRef.current === 0) {
            setIsBeingDraggedOver(true);
        }

        dragEnterRef.current += 1;
    }, [setIsBeingDraggedOver]);

    const handleDragLeave = React.useCallback(() => {
        dragEnterRef.current -= 1;

        if (dragEnterRef.current === 0) {
            setIsBeingDraggedOver(false);
        }
    }, [setIsBeingDraggedOver]);

    const handleDragOver = React.useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleDrop = React.useCallback((e) => {
        e.preventDefault();

        if (onDrop) {
            const data = e.dataTransfer.getData('text');
            onDrop(data as DraggableContentProps['value']);
        }

        dragEnterRef.current = 0;
        setIsBeingDraggedOver(false);
    }, [setIsBeingDraggedOver, onDrop]);

    return (
        <div
            className={_cs(
                styles.dropContainer,
                className,
                isBeingDraggedOver && styles.draggedOver,
                isBeingDraggedOver && draggedOverClassName,
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            { isBeingDraggedOver && (
                <div className={_cs(styles.dropOverlay, dropOverlayContainerClassName)}>
                    { dropOverlayContent }
                </div>
            )}
            { children }
        </div>
    );
}

export default DropContaier;
