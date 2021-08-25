import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoList,
    IoSearch,
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
}

function Message(props: Props) {
    const {
        className,
        pending,
        empty,
        filtered,
        icon: iconFromProps,
        emptyIcon = <IoList />,
        filteredEmptyIcon = <IoSearch />,
        message: messageFromProps,
        pendingMessage,
        emptyMessage = 'Cannot find any item',
        filteredEmptyMessage = 'Cannot find any matching item',
        pendingContainerClassName,
        compact,
    } = props;

    if (pending) {
        return (
            <PendingMessage
                className={pendingContainerClassName}
                message={pendingMessage}
                compact={compact}
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
                compact && styles.compact,
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
