import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { GrDrag } from 'react-icons/gr';

import ElementFragments from '#components/ElementFragments';

import styles from './styles.css';

type DivElementProps = React.HTMLProps<HTMLDivElement>;

export interface Props {
    className?: string;
    children: React.ReactNode;
    onDragStart?: DivElementProps['onDragStart'];
    elementRef?: DivElementProps['ref'];
}

function DraggableContent(props: Props) {
    const {
        className,
        children,
        onDragStart,
        elementRef,
    } = props;

    return (
        <div
            ref={elementRef}
            className={_cs(styles.draggableContent, className)}
            draggable
            onDragStart={onDragStart}
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
