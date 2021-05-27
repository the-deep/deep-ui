import React from 'react';
import {
    _cs,
    isNotDefined,
} from '@togglecorp/fujs';

import Portal from '../Portal';
import useParentPositionTracking from '../../hooks/useParentPositionTracking';
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

function getFloatPlacementOnParentRect(bcr: DOMRect | undefined): FloatingPlacementProps {
    const placement = {
        ...defaultPlacement,
    };

    let horizontalPosition: 'left' | 'right' | undefined;
    let verticalPosition: 'bottom' | 'top' | undefined;
    let contentWidth = 'auto';
    let maxHeight = 'auto';

    if (bcr) {
        const { x, y, width, height } = bcr;

        const cX = window.innerWidth / 2;
        const cY = window.innerHeight / 2;

        horizontalPosition = (cX - bcr.x) > 0 ? 'right' : 'left';
        verticalPosition = (cY - bcr.y) > 0 ? 'bottom' : 'top';

        if (horizontalPosition === 'left') {
            placement.right = `${window.innerWidth - x - width}px`;
        } else if (horizontalPosition === 'right') {
            placement.left = `${x}px`;
        }

        if (verticalPosition === 'top') {
            placement.bottom = `${window.innerHeight - y + 10}px`;
        } else if (verticalPosition === 'bottom') {
            placement.top = `${y + height + 10}px`;
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

type PopupFeatureKeys = 'show' | 'elementRef' | 'className' | 'contentClassName' | 'contentRef' | 'children' | 'tipClassName';
export function usePopupFeatures(
    props: Pick<Props, PopupFeatureKeys> & {
        matchParentWidth?: boolean;
        useMousePosition?: boolean;
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
    } = props;
    const [delayedShow, setDelayedShow] = React.useState<boolean | undefined>();
    const dummyRef = React.useRef<HTMLDivElement>(null);
    const parentBCR = useParentPositionTracking(dummyRef, delayedShow && !useMousePosition);
    const [mouseX, mouseY] = useMousePositionTracking(useMousePosition && delayedShow);
    const {
        placement,
        width,
        horizontalPosition,
        verticalPosition,
        maxHeight,
    } = useMousePosition
        ? getFloatPlacementOnMousePosition(mouseX, mouseY)
        : getFloatPlacementOnParentRect(parentBCR);

    React.useEffect(() => {
        setDelayedShow(show);
    }, [show]);

    const popupChildren = (
        <Portal>
            <div
                style={{
                    ...placement,
                    width: matchParentWidth ? width : undefined,
                }}
                ref={elementRef}
                className={_cs(
                    styles.popup,
                    className,
                    horizontalPosition === 'left' ? styles.left : styles.right,
                    verticalPosition === 'top' ? styles.top : styles.bottom,
                    !show && styles.hidden,
                )}
            >
                <div className={_cs(styles.tip, tipClassName)} />
                <div
                    ref={contentRef}
                    className={_cs(styles.content, contentClassName)}
                    style={{
                        width: matchParentWidth ? width : undefined,
                        maxHeight,
                    }}
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
    children: React.ReactNode;
    show?: boolean;
    tipClassName?: string;
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
        matchParentWidth: true,
    });

    const shouldUnmount = useUnmountTransition(show);

    return (
        <>
            <div
                ref={dummyRef}
                className={styles.dummy}
            />
            {!shouldUnmount && popupChildren }
        </>
    );
}

export default genericMemo(Popup);
