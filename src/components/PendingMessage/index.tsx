import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Cover from '../Cover';
import PendingAnimation from '../PendingAnimation';
import styles from './styles.css';

export interface Props {
    className?: string;
    message?: React.ReactNode;
    compact?: boolean;
}

function PendingMessage(props: Props) {
    const {
        className,
        message = 'Please wait...',
        compact,
    } = props;

    return (
        <Cover
            className={_cs(
                styles.pendingMessage,
                className,
                compact && styles.compact,
            )}
        >
            <PendingAnimation className={styles.icon} />
            <div className={styles.message}>
                { message }
            </div>
        </Cover>
    );
}

export default PendingMessage;
