import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useSizeTracking(
    elementRef: React.RefObject<HTMLElement>,
    shouldTrack = true,
) {
    const [bcr, setBcr] = React.useState<DOMRect | undefined>(undefined);
    const callbackRef = React.useRef<number | undefined>();

    const resizeObserverRef = React.useRef<ResizeObserver>();

    const handleResize = React.useCallback(() => {
        if (callbackRef.current) {
            window.cancelIdleCallback(callbackRef.current);
        }

        callbackRef.current = window.requestIdleCallback(() => {
            const { current: el } = elementRef;
            const trackingTarget = el;

            if (trackingTarget) {
                const elementBCR = trackingTarget.getBoundingClientRect();
                setBcr(elementBCR);
            }
        }, { timeout: 200 });
    }, [elementRef, setBcr]);

    React.useEffect(() => {
        if (!shouldTrack) {
            return undefined;
        }

        const { current: el } = elementRef;

        if (!el) {
            console.error('useSizeTrackign: Cannot reference requested element');
            return undefined;
        }

        const targetElement = el;

        resizeObserverRef.current = new ResizeObserver(handleResize);
        resizeObserverRef.current.observe(targetElement);

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [elementRef, handleResize, shouldTrack]);

    return bcr;
}

export default useSizeTracking;
