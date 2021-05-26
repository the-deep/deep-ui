import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Portal from '../Portal';
import useParentPositionTracking from '../../hooks/useParentPositionTracking';
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

function getFloatPlacement(bcr: DOMRect | undefined): FloatingPlacementProps {
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

export interface Props {
    className?: string;
    contentClassName?: string;
    elementRef?: React.RefObject<HTMLDivElement>;
    contentRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    show?: boolean;
    onHide?: () => void;
}

function Popup(props: Props) {
    const {
        children,
        className,
        contentClassName,
        contentRef,
        elementRef,
        show,
        // onHide,
    } = props;

    const [delayedShow, setDelayedShow] = React.useState<boolean | undefined>();

    const shouldUnmount = useUnmountTransition(show);

    const dummyRef = React.useRef<HTMLDivElement>(null);
    const parentBCR = useParentPositionTracking(dummyRef, delayedShow);

    React.useEffect(() => {
        setDelayedShow(show);
    }, [show]);

    if (shouldUnmount) {
        return null;
    }

    const {
        placement,
        width,
        horizontalPosition,
        verticalPosition,
        maxHeight,
    } = getFloatPlacement(parentBCR);

    return (
        <>
            <div
                ref={dummyRef}
                className={styles.dummy}
            />
            <Portal>
                <div
                    style={{
                        ...placement,
                        minWidth: width,
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
                    <div className={styles.tip} />
                    <div
                        ref={contentRef}
                        className={_cs(styles.content, contentClassName)}
                        style={{ minWidth: width, maxHeight }}
                    >
                        { children }
                    </div>
                </div>
            </Portal>
        </>
    );
}

export default genericMemo(Popup);
