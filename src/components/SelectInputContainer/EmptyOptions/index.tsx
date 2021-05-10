import React from 'react';

import PendingMessage from '../../PendingMessage';

import styles from './styles.css';

export interface Props {
    pending?: boolean;
    filtered?: boolean;
    optionsCount: number;
    totalOptionsCount: number | undefined;
}

function EmptyOptions(props: Props) {
    const {
        filtered = false,
        pending = false,
        optionsCount,
        totalOptionsCount = 0,
    } = props;

    if (pending) {
        return (
            <div className={styles.empty}>
                <PendingMessage />
            </div>
        );
    }

    if (optionsCount <= 0) {
        if (filtered) {
            return (
                <div className={styles.empty}>
                    No matching options available.
                </div>
            );
        }
        return (
            <div className={styles.empty}>
                No options available.
            </div>
        );
    }

    // When optionsCount is zero, totalOptionsCount should be zero as well
    const hiddenOptions = totalOptionsCount - optionsCount;
    if (hiddenOptions > 0) {
        return (
            // FIXME: use message
            <div className={styles.hiddenOptionsCount}>
                {`and ${hiddenOptions} more`}
            </div>
        );
    }

    return null;
}
export default EmptyOptions;
