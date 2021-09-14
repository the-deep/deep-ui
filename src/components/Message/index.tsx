import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoSearch,
    IoEarth,
} from 'react-icons/io5';

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
    compactPendingMessage?: boolean;
    compactEmptyMessage?: boolean;
}

function Message(props: Props) {
    const {
        className,
        pending,
        empty,
        filtered,
        icon: iconFromProps,
        emptyIcon = <IoEarth />,
        filteredEmptyIcon = <IoSearch />,
        message: messageFromProps,
        pendingMessage,
        emptyMessage = 'No data available',
        filteredEmptyMessage = 'No matching data',
        pendingContainerClassName,
        compact,
        compactPendingMessage,
        compactEmptyMessage,
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
        if (filtered) {
            icon = filteredEmptyIcon;
            message = filteredEmptyMessage;
        } else {
            icon = emptyIcon;
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
                (compact || compactEmptyMessage) && styles.compact,
            )}
        >
            <div className={styles.iconContainer}>
                {icon}
            </div>
            <div className={styles.content}>
                { message }
            </div>
        </div>
    );
}

export default genericMemo(Message);
