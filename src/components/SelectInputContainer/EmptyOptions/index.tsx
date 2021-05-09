import React from 'react';

import PendingMessage from '../../PendingMessage';

import styles from './styles.css';

export interface Props {
    pending?: boolean;
    filtered?: boolean;
    empty?: boolean;
}

function EmptyOptions(props: Props) {
    const {
        filtered = false,
        pending = false,
        empty = false,
    } = props;

    if (pending) {
        return (
            <div className={styles.empty}>
                <PendingMessage />
            </div>
        );
    }

    if (!empty) {
        return null;
    }

    if (filtered) {
        return (
            // FIXME: use message
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
export default EmptyOptions;
