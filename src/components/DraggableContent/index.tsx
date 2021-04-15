import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { GrDrag } from 'react-icons/gr';

import ElementFragments from '../ElementFragments';

import styles from './styles.css';

type DivElementProps = React.HTMLProps<HTMLDivElement>;

type SerializableValue = Record<string, unknown>;

export interface Props {
    className?: string;
    children: React.ReactNode;
    elementRef?: DivElementProps['ref'];
    value?: SerializableValue;
    dropEffect?: 'copy' | 'move' | 'link' | 'none';
    onDragStart?: (value: SerializableValue | undefined) => void;
}

function DraggableContent(props: Props) {
    const {
        className,
        children,
        elementRef,
        dropEffect = 'copy',
        onDragStart,
        value,
    } = props;

    const [draggable, setDraggable] = React.useState(false);

    const handleDragEnd = React.useCallback(() => {
        setDraggable(false);
    }, [setDraggable]);

    React.useEffect(() => {
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('dragend', handleDragEnd);

        return () => {
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('dragend', handleDragEnd);
        };
    }, [handleDragEnd]);

    const handleDragStart = React.useCallback((e) => {
        const data = JSON.stringify(value);

        e.dataTransfer.setData('text/plain', data);
        e.dataTransfer.dropEffect = dropEffect;

        if (onDragStart) {
            onDragStart(value);
        }
    }, [onDragStart, dropEffect, value]);

    const handleDragHandleMouseDown = React.useCallback(() => {
        setDraggable(true);
    }, [setDraggable]);

    return (
        <div
            ref={elementRef}
            className={_cs(styles.draggableContent, className)}
            draggable={draggable}
            onDragStart={handleDragStart}
        >
            <ElementFragments
                actionsContainerClassName={styles.actions}
                actions={(
                    <div
                        role="presentation"
                        onMouseDown={handleDragHandleMouseDown}
                        className={styles.actionContainer}
                    >
                        <GrDrag />
                    </div>
                )}
            >
                { children }
            </ElementFragments>
        </div>
    );
}

export default DraggableContent;
