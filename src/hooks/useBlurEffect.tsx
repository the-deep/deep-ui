import React from 'react';

function useBlurEffect(
    shouldWatch: boolean,
    callback: (clickedOnElement: boolean, clickedOnParent: boolean, e: MouseEvent) => void,
    elementRef: React.RefObject<HTMLElement>,
    parentRef?: React.RefObject<HTMLElement>,
) {
    React.useEffect(
        () => {
            if (!shouldWatch) {
                return undefined;
            }

            const handleDocumentClick = (e: MouseEvent) => {
                const element = elementRef.current;
                const parent = parentRef?.current;

                const isElementOrContainedInElement = element
                    ? element === e.target || element.contains(e.target as HTMLElement)
                    : false;
                const isParentOrContainedInParent = parent
                    ? parent === e.target || parent.contains(e.target as HTMLElement)
                    : false;

                callback(isElementOrContainedInElement, isParentOrContainedInParent, e);
            };

            document.addEventListener('click', handleDocumentClick, true);

            return () => {
                document.removeEventListener('click', handleDocumentClick, true);
            };
        },
        [shouldWatch, callback, elementRef, parentRef],
    );
}

export default useBlurEffect;
