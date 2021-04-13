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

    const handleDragStart = React.useCallback((e) => {
        const data = JSON.stringify(value);

        e.dataTransfer.setData('text/plain', data);
        e.dataTransfer.dropEffect = dropEffect;

        if (onDragStart) {
            onDragStart(value);
        }
    }, [onDragStart, dropEffect, value]);

    return (
        <div
            ref={elementRef}
            className={_cs(styles.draggableContent, className)}
            draggable
            onDragStart={handleDragStart}
        >
            <ElementFragments
                actionsContainerClassName={styles.actions}
                actions={(
                    <GrDrag />
                )}
            >
                { children }
            </ElementFragments>
        </div>
    );
}

export default DraggableContent;
