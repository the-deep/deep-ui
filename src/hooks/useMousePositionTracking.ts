import React from 'react';

function useMousePositionTracking(use = true) {
    const [x, setX] = React.useState<number|undefined>();
    const [y, setY] = React.useState<number|undefined>();

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        setX(e.clientX);
        setY(e.clientY);
    }, []);

    const handleMouseOver = React.useCallback((e: MouseEvent) => {
        setX(e.clientX);
        setY(e.clientY);
    }, []);

    React.useEffect(() => {
        if (use) {
            window.addEventListener('mouseover', handleMouseOver);
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mouseover', handleMouseMove);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [use, handleMouseMove, handleMouseOver]);

    return [x, y];
}

export default useMousePositionTracking;
