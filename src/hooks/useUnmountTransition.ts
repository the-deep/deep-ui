import React from 'react';

function useUnmountTransition(show: boolean | undefined) {
    const prevShow = React.useRef<boolean | undefined>();
    const timeoutRef = React.useRef<number | undefined>();
    const [shouldUnmount, setShouldUnmount] = React.useState(!show);

    React.useEffect(() => {
        if (prevShow.current === true && !show) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                setShouldUnmount(true);
            }, 300);
        } else {
            setShouldUnmount(!show);
        }
        prevShow.current = show;
    }, [show]);

    return shouldUnmount;
}

export default useUnmountTransition;
