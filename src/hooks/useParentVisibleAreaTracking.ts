import React from 'react';

const thresholds = Array.from(Array(100).keys()).map((i) => i / 100);

interface BCR {
    x: number;
    y: number;
    width: number;
    height: number;
}

function useParentVisibleAreaTracking(
    elementRef: React.RefObject<HTMLElement>,
) {
    const intersectionRootsRef = React.useRef<Map<HTMLDivElement, IntersectionObserver>>(new Map());
    const [visibleBCR, setVisibleBCR] = React.useState<BCR | undefined>();

    const handleIntersection: IntersectionObserverCallback = React.useCallback((e, observer) => {
        const targetBCR = e[0].target.getBoundingClientRect();
        let rootBCR;

        if (observer.root !== document) {
            rootBCR = (observer?.root as Element)?.getBoundingClientRect();
            const dx = rootBCR.x - targetBCR.x;
            const dy = rootBCR.y - targetBCR.y;

            const dh = (rootBCR.y + rootBCR.height) - (targetBCR.y + targetBCR.height);
            const dw = (rootBCR.x + rootBCR.width) - (targetBCR.x + targetBCR.width);

            if (dx > 0 || dy > 0) {
                const vx = rootBCR.x;
                const vy = rootBCR.y;
                const vh = targetBCR.height - dy;
                const vw = targetBCR.width - dx;

                setVisibleBCR({
                    x: vx,
                    y: vy,
                    width: vw,
                    height: vh,
                });
            }

            if (dh < 0 || dw < 0) {
                const vx = targetBCR.x;
                const vy = targetBCR.y;
                const vh = targetBCR.height + dh;
                const vw = targetBCR.width + dw;

                setVisibleBCR({
                    x: vx,
                    y: vy,
                    width: vw,
                    height: vh,
                });
            }
        } else {
            // TODO: Handle intersection at document element
            // rootBCR = observer.root.documentElement.getBoundingClientRect();
            // console.info('document', rootBCR, targetBCR);
        }
    }, []);

    const handleScroll = React.useCallback((e: Event) => {
        const el = e.target as HTMLDivElement;

        if (elementRef?.current?.parentElement) {
            if (el.contains(elementRef.current.parentElement)) {
                if (!intersectionRootsRef.current.has(el)) {
                    const observer = new IntersectionObserver(
                        handleIntersection,
                        {
                            root: el,
                            threshold: thresholds,
                        },
                    );
                    intersectionRootsRef.current.set(el, observer);
                    observer.observe(elementRef.current.parentElement);
                }
            }
        }
    }, [handleIntersection, elementRef]);

    React.useEffect(() => {
        const { current: el } = elementRef;

        if (!el) {
            console.error('useParentVisibleAreaTracking: Cannot reference requested element');
            return undefined;
        }

        if (!el.parentElement) {
            console.error('useParentVisibleAreaTracking: Cannot find parent element');
            return undefined;
        }

        document.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [handleScroll, handleIntersection, elementRef]);

    return visibleBCR;
}

export default useParentVisibleAreaTracking;
