import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import Cover from '../Cover';
import PendingAnimation from '../PendingAnimation';
import styles from './styles.css';

export interface Props {
    className?: string;
    message?: React.ReactNode;
    compact?: boolean;
    noDebouncing?: boolean;
}

function PendingMessage(props: Props) {
    const {
        className,
        message = 'Please wait...',
        compact,
        noDebouncing,
    } = props;

    return (
        <Cover
            className={_cs(
                styles.pendingMessage,
                className,
                compact && styles.compact,
                noDebouncing && styles.noDebouncing,
            )}
        >
            <PendingAnimation className={styles.icon} />
            <div className={styles.message}>
                { message }
            </div>
        </Cover>
    );
}

export default genericMemo(PendingMessage);
