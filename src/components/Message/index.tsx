import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Kraken, { SizeTypes as KrakenSizeTypes } from '../Kraken';
import { genericMemo } from '../../utils';
import PendingMessage from '../PendingMessage';

import styles from './styles.css';

export interface Props {
    className?: string;
    pending?: boolean;
    empty?: boolean;
    filtered?: boolean;
    icon?: React.ReactNode;
    emptyIcon?: React.ReactNode;
    filteredEmptyIcon?: React.ReactNode;
    message?: React.ReactNode;
    pendingMessage?: React.ReactNode;
    emptyMessage?: React.ReactNode;
    filteredEmptyMessage?: React.ReactNode;
    pendingContainerClassName?: string;
    compact?: boolean;
    compactAndVertical?: boolean;
    compactPendingMessage?: boolean;
    compactEmptyMessage?: boolean;
    messageHidden?: boolean;
    messageIconHidden?: boolean;
}

function Message(props: Props) {
    const {
        className,
        pending,
        empty,
        filtered,
        icon: iconFromProps,
        emptyIcon,
        filteredEmptyIcon,
        message: messageFromProps,
        pendingMessage,
        emptyMessage = 'No data available',
        filteredEmptyMessage = 'No matching data',
        pendingContainerClassName,
        compact,
        compactPendingMessage,
        compactEmptyMessage,
        compactAndVertical,
        messageHidden = false,
        messageIconHidden = false,
    } = props;

    if (pending) {
        return (
            <PendingMessage
                className={pendingContainerClassName}
                message={pendingMessage}
                compact={compactPendingMessage || compact}
            />
        );
    }

    let icon: React.ReactNode = iconFromProps;
    let message: React.ReactNode = messageFromProps;

    if (empty) {
        let size: KrakenSizeTypes = 'medium';
        if (compact) {
            size = 'extraSmall';
        } else if (compactAndVertical) {
            size = 'small';
        }
        if (filtered) {
            icon = filteredEmptyIcon ?? (
                <Kraken
                    variant="search"
                    size={size}
                />
            );
            message = filteredEmptyMessage;
        } else {
            icon = emptyIcon ?? (
                <Kraken
                    variant="ballon"
                    size={size}
                />
            );
            message = emptyMessage;
        }
    }

    if (!icon && !message) {
        return null;
    }

    return (
        <div
            className={_cs(
                className,
                styles.message,
                (compactAndVertical || compact || compactEmptyMessage) && styles.compact,
                compactAndVertical && styles.vertical,
            )}
        >
            {!messageIconHidden && (
                <div className={styles.iconContainer}>
                    {icon}
                </div>
            )}
            {!messageHidden && (
                <div className={styles.content}>
                    { message }
                </div>
            )}
        </div>
    );
}

export default genericMemo(Message);
