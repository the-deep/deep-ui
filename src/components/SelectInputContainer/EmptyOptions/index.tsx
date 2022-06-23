import React from 'react';
import { IoChevronForward } from 'react-icons/io5';

import PendingAnimation from '../../PendingAnimation';
import { genericMemo } from '../../../utils';
import Button from '../../Button';

import styles from './styles.css';

export interface Props {
    pending?: boolean;
    filtered?: boolean;
    optionsCount: number;
    totalOptionsCount: number | undefined;
    handleShowMoreClick?: () => void;
}

function EmptyOptions(props: Props) {
    const {
        filtered = false,
        pending = false,
        optionsCount,
        totalOptionsCount = 0,
        handleShowMoreClick,
    } = props;

    if (pending) {
        return (
            <div className={styles.empty}>
                <PendingAnimation />
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
                <span className={styles.hiddenCountMessage}>
                    {`and ${hiddenOptions} more`}
                </span>
                {handleShowMoreClick && (
                    <Button
                        className={styles.button}
                        name={undefined}
                        onClick={handleShowMoreClick}
                        actions={<IoChevronForward />}
                        variant="transparent"
                    >
                        show more
                    </Button>
                )}
            </div>
        );
    }

    return null;
}
export default genericMemo(EmptyOptions);
