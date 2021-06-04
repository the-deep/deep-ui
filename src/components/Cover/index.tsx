import React from 'react';
import { _cs } from '@togglecorp/fujs';

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

        const { current: el } = dummyRef;
        if (el && el.parentElement) {
            const { style } = el.parentElement;
            const {
                position,
                zIndex,
            } = style;

            if (!zIndex) {
                styles.zIndex = '0';
            }

            if (position !== 'absolute' && position !== 'relative' && position !== 'fixed' && position !== 'sticky') {
                el.parentElement.style.position = 'relative';
            }
        }

        callbackRef.current = window.requestIdleCallback(() => {
            if (containerRef.current) {
                const {
                    width,
                    height,
                } = bcr ?? {};

                containerRef.current.style.left = '0';
                containerRef.current.style.top = '0';
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
            <div
                className={_cs(styles.cover, className)}
                ref={containerRef}
            >
                { children }
            </div>
        </>
    );
}

export default Cover;
