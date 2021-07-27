import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

type Position = 'top' | 'right' | 'bottom' | 'left';
const positionToStyleMap: {
    [key in Position]: string;
} = {
    top: styles.top,
    right: styles.right,
    bottom: styles.bottom,
    left: styles.left,
};

export interface Props {
    className?: string;
    active?: boolean;
    errored?: boolean;
    position?: Position;
    disabled?: boolean;
    transparent?: boolean;
}

function Border(props: Props) {
    const {
        className,
        active,
        errored,
        position = 'bottom',
        disabled,
        transparent,
    } = props;

    return (
        <div
            className={_cs(
                styles.border,
                active && styles.active,
                errored && styles.errored,
                positionToStyleMap[position] ?? styles.bottom,
                disabled && styles.disabled,
                transparent && styles.transparent,
                className,
            )}
        >
            {active && <div className={styles.activeBorder} />}
        </div>
    );
}

export default Border;
