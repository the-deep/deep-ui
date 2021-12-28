import React, { useCallback, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useSizeTracking(
    elementRef: React.RefObject<HTMLElement>,
    shouldTrack = true,
) {
    const [bcr, setBcr] = React.useState<DOMRect | undefined>(undefined);

    const resizeObserverRef = React.useRef<ResizeObserver>();

    const callbackRef = React.useRef<number | undefined>();
    const handleResize: ResizeObserverCallback = useCallback(
        (entries: ResizeObserverEntry[]) => {
            if (callbackRef.current) {
                window.cancelIdleCallback(callbackRef.current);
            }

            const firstEntry = entries[0];
            if (!firstEntry) {
                return;
            }

            callbackRef.current = window.requestIdleCallback(() => {
                const elementBCR = firstEntry.contentRect;
                setBcr(elementBCR);
            }, { timeout: 200 });
        },
        [],
    );

    useEffect(() => {
        if (!shouldTrack) {
            return undefined;
        }

        const { current: el } = elementRef;

        if (!el) {
            console.error('useSizeTrackign: Cannot reference requested element');
            return undefined;
        }

        resizeObserverRef.current = new ResizeObserver(handleResize);
        resizeObserverRef.current.observe(el);

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [elementRef, handleResize, shouldTrack]);

    return bcr;
}

export default useSizeTracking;
