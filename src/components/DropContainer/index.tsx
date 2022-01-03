import React from 'react';
import { IoDownloadOutline } from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

import Container, { Props as ContainerProps } from '../Container';
import type {
    Props as DraggableContentProps,
    SerializableValue,
} from '../DraggableContent';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props extends Omit<ContainerProps, 'containerElementProps'> {
    className?: string;
    children?: React.ReactNode;
    onDrop?: (value: DraggableContentProps['value'] | undefined) => void;
    dropOverlayContainerClassName?: string;
    dropOverlayContent?: React.ReactNode;
    draggedOverClassName?: string;
    name: string;
    disabled?: boolean;
}

function DropContainer(props: Props) {
    const {
        className,
        children,
        onDrop,
        dropOverlayContainerClassName,
        dropOverlayContent = <IoDownloadOutline className={styles.dropOverlayIcon} />,
        draggedOverClassName,
        name,
        disabled,
        ...otherProps
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

    const handleDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback((e) => {
        e.preventDefault();

        if (onDrop) {
            const data = e.dataTransfer.getData('text');
            try {
                const resolvedData = JSON.parse(data);
                if (resolvedData.$name === name) {
                    onDrop(resolvedData as SerializableValue);
                }
            } catch (exception) {
                console.error(exception);
            }
        }

        dragEnterRef.current = 0;
        setIsBeingDraggedOver(false);
    }, [setIsBeingDraggedOver, onDrop, name]);

    const containerElementProps = React.useMemo(
        () => (!disabled ? ({
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
        }) : undefined),
        [handleDragEnter, handleDragLeave, handleDragOver, handleDrop, disabled],
    );

    return (
        <Container
            {...otherProps}
            className={_cs(
                styles.dropContainer,
                className,
                isBeingDraggedOver && styles.draggedOver,
                isBeingDraggedOver && draggedOverClassName,
            )}
            containerElementProps={containerElementProps}
        >
            {!disabled && (
                <div className={_cs(styles.dropOverlay, dropOverlayContainerClassName)}>
                    { dropOverlayContent }
                </div>
            )}
            { children }
        </Container>
    );
}

export default genericMemo(DropContainer);
