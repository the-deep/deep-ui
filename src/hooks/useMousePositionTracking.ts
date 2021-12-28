import React from 'react';

function useMousePositionTracking(use = true) {
    const [pos, setPos] = React.useState<[number, number] | undefined>(undefined);

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        setPos([e.clientX, e.clientY]);
    }, []);

    const handleMouseOver = React.useCallback((e: MouseEvent) => {
        setPos([e.clientX, e.clientY]);
    }, []);

    React.useEffect(() => {
        if (use) {
            window.addEventListener('mouseover', handleMouseOver);
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [use, handleMouseMove, handleMouseOver]);

    return pos;
}

export default useMousePositionTracking;
