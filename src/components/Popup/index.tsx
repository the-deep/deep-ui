import React from 'react';
import {
    _cs,
    isNotDefined,
} from '@togglecorp/fujs';

import Portal from '../Portal';
import usePositionTracking from '../../hooks/usePositionTracking';
import useMousePositionTracking from '../../hooks/useMousePositionTracking';
import useUnmountTransition from '../../hooks/useUnmountTransition';

import { genericMemo } from '../../utils';

import styles from './styles.css';

const defaultPlacement = {
    top: 'unset',
    right: 'unset',
    bottom: 'unset',
    left: 'unset',
};

interface FloatingPlacementProps {
    placement: {
        top: string | undefined;
        right: string | undefined;
        bottom: string | undefined;
        left: string | undefined;
    };
    width: string | undefined;
    horizontalPosition: 'left' | 'right' | undefined;
    verticalPosition: 'top' | 'bottom' | undefined;
    maxHeight: string | undefined;
}

function getFloatPlacementOnParentRect(
    bcr: DOMRect | undefined,
    placementDirection: 'horizontal' | 'vertical' = 'vertical',
): FloatingPlacementProps {
    const placement = {
        ...defaultPlacement,
    };

    let horizontalPosition: 'left' | 'right' | undefined;
    let verticalPosition: 'bottom' | 'top' | undefined;
    let contentWidth = 'auto';
    let maxHeight = 'auto';
    const offsetX = 0;

    if (bcr) {
        const { x, y, width, height } = bcr;

        const cX = window.innerWidth / 2;
        const cY = window.innerHeight / 2;

        if (placementDirection === 'horizontal') {
            const OFFSET = 10;
            const xEnd = bcr.x + bcr.width;

            const startDiff = bcr.x;
            const endDiff = window.innerWidth - xEnd;

            if (startDiff > endDiff) {
                horizontalPosition = 'left';
            } else {
                horizontalPosition = 'right';
            }

            verticalPosition = (cY - bcr.y) > 0 ? 'bottom' : 'top';

            if (horizontalPosition === 'left') {
                placement.right = `${window.innerWidth - x + OFFSET}px`;
            } else if (horizontalPosition === 'right') {
                placement.left = `${x + width + OFFSET}px`;
            }

            if (verticalPosition === 'top') {
                placement.bottom = `${window.innerHeight - y - OFFSET * 2}px`;
            } else if (verticalPosition === 'bottom') {
                placement.top = `${y}px`;
            }
        } else {
            horizontalPosition = (cX - bcr.x) > 0 ? 'right' : 'left';
            verticalPosition = (cY - bcr.y) > 0 ? 'bottom' : 'top';

            if (horizontalPosition === 'left') {
                placement.right = `${Math.min(window.innerWidth, window.innerWidth - x - width - offsetX)}px`;
            } else if (horizontalPosition === 'right') {
                placement.left = `${Math.max(0, x + offsetX)}px`;
            }

            if (verticalPosition === 'top') {
                placement.bottom = `${window.innerHeight - y + 20}px`;
            } else if (verticalPosition === 'bottom') {
                placement.top = `${y + height + 20}px`;
            }
        }

        contentWidth = `${width}px`;
        maxHeight = `calc(50vh - ${height / 2}px)`;
    }

    return {
        placement,
        width: contentWidth,
        horizontalPosition,
        verticalPosition,
        maxHeight,
    };
}

function getFloatPlacementOnMousePosition(
    x: number | undefined,
    y: number | undefined,
): FloatingPlacementProps {
    const placement = {
        ...defaultPlacement,
    };

    if (isNotDefined(x) || isNotDefined(y)) {
        return {
            placement,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            width: 'auto',
            maxHeight: 'auto',
        };
    }

    const offsetX = -20;
    const offsetY = 6;

    const cX = window.innerWidth / 2;
    const cY = window.innerHeight / 2;

    const horizontalPosition = (cX - x) > 0 ? 'right' : 'left';
    const verticalPosition = (cY - y) > 0 ? 'bottom' : 'top';

    if (horizontalPosition === 'left') {
        placement.right = `${window.innerWidth - x - offsetX}px`;
    } else if (horizontalPosition === 'right') {
        placement.left = `${x + offsetX}px`;
    }

    if (verticalPosition === 'top') {
        placement.bottom = `${window.innerHeight - y + offsetY}px`;
    } else if (verticalPosition === 'bottom') {
        placement.top = `${y + offsetY}px`;
    }

    return {
        placement,
        horizontalPosition,
        verticalPosition,
        width: 'auto',
        maxHeight: 'auto',
    };
}

type PopupFeatureKeys = 'show' | 'elementRef' | 'className' | 'contentClassName' | 'contentRef' | 'parentRef' | 'children' | 'tipClassName';
export function usePopupFeatures(
    props: Pick<Props, PopupFeatureKeys> & {
        matchParentWidth?: boolean;
        useMousePosition?: boolean;
        popupPlacementDirection?: 'horizontal' | 'vertical';
    },
) {
    const {
        show,
        elementRef,
        contentRef,
        className,
        contentClassName,
        children,
        tipClassName,
        matchParentWidth,
        useMousePosition,
        parentRef,
        popupPlacementDirection,
    } = props;

    const [delayedShow, setDelayedShow] = React.useState<boolean | undefined>();
    const dummyRef = React.useRef<HTMLDivElement>(null);
    const parentBCR = usePositionTracking(
        parentRef ?? dummyRef,
        delayedShow && !useMousePosition,
        !parentRef,
    );
    const mousePositions = useMousePositionTracking((useMousePosition && delayedShow) ?? false);
    const mouseX = mousePositions?.[0];
    const mouseY = mousePositions?.[1];

    const {
        placement,
        width,
        horizontalPosition,
        verticalPosition,
        maxHeight,
    } = useMousePosition
        ? getFloatPlacementOnMousePosition(mouseX, mouseY)
        : getFloatPlacementOnParentRect(parentBCR, popupPlacementDirection);

    React.useEffect(() => {
        setDelayedShow(show);
    }, [show]);

    const popupChildren = (
        <Portal>
            <div
                style={{
                    ...placement,
                    width: matchParentWidth ? width : undefined,
                    maxHeight,
                }}
                ref={elementRef}
                className={_cs(
                    styles.popup,
                    className,
                    horizontalPosition === 'left' ? styles.left : styles.right,
                    verticalPosition === 'top' ? styles.top : styles.bottom,
                    !show && styles.hidden,
                    popupPlacementDirection === 'horizontal' && styles.horizontalPlacement,
                )}
            >
                <div className={_cs(styles.tip, tipClassName)} />
                <div
                    ref={contentRef}
                    className={_cs(styles.content, contentClassName)}
                >
                    { children }
                </div>
            </div>
        </Portal>
    );

    return {
        dummyRef,
        popupChildren,
    };
}

export interface Props {
    className?: string;
    contentClassName?: string;
    elementRef?: React.RefObject<HTMLDivElement>;
    contentRef?: React.RefObject<HTMLDivElement>;

    /**
     * ref of element where the popup should be attached
     * NOTE: if not provided, popup will attach to it's DOM parent node
     */
    parentRef?: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    show?: boolean;
    tipClassName?: string;
    freeWidth?: boolean;
    onUnmount?: () => void;
    placementDirection?: 'horizontal' | 'vertical';
}

function Popup(props: Props) {
    const {
        children,
        className,
        contentClassName,
        contentRef,
        elementRef,
        show,
        tipClassName,
        freeWidth = false,
        onUnmount,
        parentRef,
        placementDirection,
    } = props;

    const {
        dummyRef,
        popupChildren,
    } = usePopupFeatures({
        children,
        className,
        contentClassName,
        contentRef,
        elementRef,
        show,
        tipClassName,
        matchParentWidth: !freeWidth || placementDirection === 'horizontal',
        parentRef,
        popupPlacementDirection: placementDirection,
    });

    const unmountRef = React.useRef<boolean | undefined>();
    const shouldUnmount = useUnmountTransition(show);

    React.useEffect(() => {
        if (onUnmount && unmountRef.current === false && shouldUnmount === true) {
            onUnmount();
        }

        unmountRef.current = shouldUnmount;
    }, [shouldUnmount, onUnmount]);

    return (
        <>
            {/*
                A dummy element is used to track parent DOM element
                in the case where parentRef is not provided
                since popup is mounted in body and not parent
            */}
            {!parentRef && (
                <div
                    ref={dummyRef}
                    className={styles.dummy}
                />
            )}
            {!shouldUnmount && popupChildren }
        </>
    );
}

export default genericMemo(Popup);
