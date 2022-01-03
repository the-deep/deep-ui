import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import styles from './styles.css';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

function Cover(props: Props) {
    const {
        className,
        children,
    } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const callbackRef = React.useRef<number | undefined>();

    React.useEffect(() => {
        if (callbackRef.current) {
            window.cancelIdleCallback(callbackRef.current);
        }

        const { current: el } = containerRef;
        if (el && el.parentElement) {
            const { style } = el.parentElement;
            const {
                position,
                zIndex,
            } = style;

            if (!zIndex) {
                styles.zIndex = '0';
            }

            if (position !== 'absolute' && position !== 'relative' && position !== 'fixed' && position !== 'sticky') {
                el.parentElement.style.position = 'relative';
            }
        }
    }, []);

    return (
        <div
            className={_cs(styles.cover, className)}
            ref={containerRef}
        >
            { children }
        </div>
    );
}

export default genericMemo(Cover);
