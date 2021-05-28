import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useParentPositionTracking(
    elementRef: React.RefObject<HTMLElement>,
    shouldTrack = true,
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
            if (el && el.parentElement) {
                const elementBCR = el.parentElement.getBoundingClientRect();
                const s = getComputedStyle(el.parentElement);
                console.info(s.getPropertyValue('border-width'), elementBCR.width);
                setBcr(elementBCR);
            }
        }, { timeout: 200 });
    }, [elementRef, setBcr]);

    const handleResize = queueSync;

    const handleAttributeMutation = React.useCallback((e) => {
        if (e[0].target === elementRef.current) {
            queueSync();
        }
    }, [queueSync, elementRef]);

    const handleScroll = React.useCallback((e: Event) => {
        const el = e.target as HTMLElement;

        if (el.contains(elementRef?.current?.parentElement ?? null)) {
            queueSync();
        }
    }, [queueSync, elementRef]);

    React.useEffect(() => {
        if (!shouldTrack) {
            return undefined;
        }

        const { current: el } = elementRef;

        if (!el) {
            console.error('useParentPositionTracking: Cannot reference requested element');
            return undefined;
        }

        if (!el.parentElement) {
            console.error('useParentPositionTracking: Cannot find parent element');
            return undefined;
        }

        document.addEventListener('scroll', handleScroll, true);

        resizeObserverRef.current = new ResizeObserver(handleResize);
        resizeObserverRef.current.observe(el.parentElement);

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
    }, [elementRef, handleResize, handleAttributeMutation, handleScroll, shouldTrack]);

    return bcr;
}

export default useParentPositionTracking;
