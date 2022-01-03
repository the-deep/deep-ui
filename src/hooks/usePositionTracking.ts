import React, { useEffect, useCallback, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function usePositionTracking(
    elementRef: React.RefObject<HTMLElement>,
    shouldTrack = true,
    trackParent = false,
) {
    const [bcr, setBcr] = useState<DOMRect | undefined>(undefined);

    const callbackRef = useRef<number | undefined>();
    const queueSync = useCallback(() => {
        if (callbackRef.current) {
            window.cancelIdleCallback(callbackRef.current);
        }
        callbackRef.current = window.requestIdleCallback(
            () => {
                const { current: el } = elementRef;
                const trackingTarget = trackParent ? el?.parentElement : el;

                if (trackingTarget) {
                    // FIXME: try to not use getBoundingClientRect
                    const elementBCR = trackingTarget.getBoundingClientRect();
                    setBcr(elementBCR);
                }
            },
            { timeout: 200 },
        );
    }, [elementRef, trackParent]);

    const handleResize = queueSync;

    const handleAttributeMutation: MutationCallback = useCallback((e: MutationRecord[]) => {
        const firstEntry = e[0];
        // FIXME: Any reason we don't directly attach this to elementRef?
        if (firstEntry.target === elementRef.current) {
            queueSync();
        }
    }, [queueSync, elementRef]);

    const handleScroll = useCallback((e: Event) => {
        const el = e.target as HTMLElement;
        const trackingTarget = (trackParent
            ? (elementRef?.current?.parentElement)
            : (elementRef?.current)) ?? null;

        if (el.contains(trackingTarget)) {
            queueSync();
        }
    }, [queueSync, elementRef, trackParent]);

    useEffect(() => {
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
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(targetElement);

        const mutationObserver = new MutationObserver(handleAttributeMutation);
        mutationObserver.observe(
            document.documentElement,
            {
                attributes: true,
                childList: true,
                subtree: true,
            },
        );

        return () => {
            document.removeEventListener('scroll', handleScroll, true);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [elementRef, handleResize, handleAttributeMutation, handleScroll, shouldTrack, trackParent]);

    return bcr;
}

export default usePositionTracking;
