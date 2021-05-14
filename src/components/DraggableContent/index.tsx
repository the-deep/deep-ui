import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { GrDrag } from 'react-icons/gr';

import ElementFragments, { Props as ElementFragmentsProps } from '../ElementFragments';

import styles from './styles.css';

type DivElementProps = React.HTMLProps<HTMLDivElement>;

export type SerializableValue = Record<string, unknown>;

export interface Props extends ElementFragmentsProps {
    className?: string;
    children: React.ReactNode;
    elementRef?: DivElementProps['ref'];
    name: string;
    value: SerializableValue;
    dropEffect?: 'copy' | 'move' | 'link' | 'none';
    onDragStart?: (value: SerializableValue) => void;
    onDragStop?: (value: SerializableValue) => void;
}

function DraggableContent(props: Props) {
    const {
        className,
        children,
        elementRef,
        dropEffect = 'copy',
        onDragStart,
        onDragStop,
        value,
        name,
        actions,
        iconsContainerClassName,
        actionsContainerClassName,
        ...elementFragmentsProps
    } = props;

    const [draggable, setDraggable] = React.useState(false);

    const handleDragEnd = React.useCallback((e) => {
        e.stopPropagation();
        setDraggable(false);
        if (onDragStop) {
            onDragStop(value);
        }
    }, [setDraggable, onDragStop, value]);

    React.useEffect(() => {
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('dragend', handleDragEnd);

        return () => {
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('dragend', handleDragEnd);
        };
    }, [handleDragEnd]);

    const handleDragStart: React.DragEventHandler<HTMLDivElement> = React.useCallback((e) => {
        e.stopPropagation();
        const myValue = {
            ...value,
            $name: name,
        };
        const data = JSON.stringify(myValue);

        e.dataTransfer.setData('text/plain', data);
        e.dataTransfer.dropEffect = dropEffect;

        if (onDragStart) {
            onDragStart(myValue);
        }
    }, [onDragStart, dropEffect, value, name]);

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
                {...elementFragmentsProps}
                iconsContainerClassName={_cs(styles.icon, iconsContainerClassName)}
                actionsContainerClassName={_cs(styles.actions, actionsContainerClassName)}
                actions={(
                    <>
                        <div
                            role="presentation"
                            onMouseDown={handleDragHandleMouseDown}
                            className={styles.dragContainer}
                        >
                            <GrDrag />
                        </div>
                        {actions}
                    </>
                )}
            >
                { children }
            </ElementFragments>
        </div>
    );
}

export default DraggableContent;
