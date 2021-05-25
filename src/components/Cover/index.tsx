import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Portal from '../Portal';
import useParentPositionTracking from '../../hooks/useParentPositionTracking';

import styles from './styles.css';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

function Cover(props: Props) {
    const {
        className,
        children,
    } = props;

    const dummyRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const callbackRef = React.useRef<number | undefined>();
    const bcr = useParentPositionTracking(dummyRef);

    React.useEffect(() => {
        if (callbackRef.current) {
            window.cancelIdleCallback(callbackRef.current);
        }

        callbackRef.current = window.requestIdleCallback(() => {
            if (containerRef.current) {
                const {
                    top,
                    left,
                    width,
                    height,
                } = bcr ?? {};
                containerRef.current.style.left = `${left}px`;
                containerRef.current.style.top = `${top}px`;
                containerRef.current.style.width = `${width}px`;
                containerRef.current.style.height = `${height}px`;
            }
        }, { timeout: 200 });
    }, [bcr]);

    return (
        <>
            <div
                ref={dummyRef}
                className={styles.dummy}
            />
            <Portal>
                <div
                    className={_cs(styles.cover, className)}
                    ref={containerRef}
                >
                    { children }
                </div>
            </Portal>
        </>
    );
}

export default Cover;
