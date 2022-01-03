import React from 'react';

function useUnmountTransition(show: boolean | undefined) {
    const prevShow = React.useRef<boolean | undefined>();

    const [shouldUnmount, setShouldUnmount] = React.useState(!show);

    React.useEffect(() => {
        let timeoutId: number | undefined;
        if (prevShow.current === true && !show) {
            timeoutId = window.setTimeout(() => {
                setShouldUnmount(true);
            }, 200);
        } else {
            setShouldUnmount(!show);
        }
        prevShow.current = show;

        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [show]);

    return shouldUnmount;
}

export default useUnmountTransition;
