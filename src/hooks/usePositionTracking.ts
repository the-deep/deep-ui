import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function usePositionTracking(
    elementRef: React.RefObject<HTMLElement>,
    shouldTrack = true,
    trackParent = false,
) {
    const [bcr, setBcr] = React.useState<DOMRect | undefined>(undefined);
    const callbackRef = React.useRef<number | undefined>();

    const resizeObserverRef = React.useRef<ResizeObserver>();
    const mutationObserverRef = React.useRef<MutationObserver>();

    const queueSync = React.useCallback(() => {
        if (callbackRef.current) {
            window.cancelIdleCallback(callbackRef.current);
        }

        callbackRef.current = window.requestIdleCallback(() => {
            const { current: el } = elementRef;
            const trackingTarget = trackParent ? el?.parentElement : el;

            if (trackingTarget) {
                const elementBCR = trackingTarget.getBoundingClientRect();
                setBcr(elementBCR);
            }
        }, { timeout: 200 });
    }, [elementRef, setBcr, trackParent]);

    const handleResize = queueSync;

    const handleAttributeMutation = React.useCallback((e) => {
        if (e[0].target === elementRef.current) {
            queueSync();
        }
    }, [queueSync, elementRef]);

    const handleScroll = React.useCallback((e: Event) => {
        const el = e.target as HTMLElement;
        const trackingTarget = (trackParent
            ? (elementRef?.current?.parentElement)
            : (elementRef?.current)) ?? null;

        if (el.contains(trackingTarget)) {
            queueSync();
        }
    }, [queueSync, elementRef, trackParent]);

    React.useEffect(() => {
        if (!shouldTrack) {
            return undefined;
        }

        const { current: el } = elementRef;

        if (!el) {
            console.error('useParentPositionTracking: Cannot reference requested element');
            return undefined;
        }

        const { parentElement } = el;
        if (trackParent && !parentElement) {
            console.error('useParentPositionTracking: Cannot find parent element');
            return undefined;
        }

        document.addEventListener('scroll', handleScroll, true);
        const targetElement = trackParent ? parentElement as HTMLElement : el;

        resizeObserverRef.current = new ResizeObserver(handleResize);
        resizeObserverRef.current.observe(targetElement);

        mutationObserverRef.current = new MutationObserver(handleAttributeMutation);
        mutationObserverRef.current.observe(
            document.documentElement,
            {
                attributes: true,
                childList: true,
                subtree: true,
            },
        );

        return () => {
            document.removeEventListener('scroll', handleScroll, true);

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            if (mutationObserverRef.current) {
                mutationObserverRef.current.disconnect();
            }
        };
    }, [elementRef, handleResize, handleAttributeMutation, handleScroll, shouldTrack, trackParent]);

    return bcr;
}

export default usePositionTracking;
