import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import styles from './styles.css';

function Circle() {
    return (
        <div className={styles.circle}>
            <div className={styles.innerCircle} />
        </div>
    );
}

export interface Props {
    className?: string;
    inheritColor?: boolean;
}

function PendingAnimation(props: Props) {
    const {
        className,
        inheritColor,
    } = props;

    return (
        <div
            className={_cs(
                styles.pendingAnimation,
                inheritColor && styles.inheritColor,
                className,
            )}
        >
            <Circle />
            <Circle />
            <Circle />
        </div>
    );
}

export default genericMemo(PendingAnimation);
