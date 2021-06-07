import React from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    IoInformationCircle,
    IoWarning,
    IoCheckmarkCircle,
    IoClose,
} from 'react-icons/io5';

import { AlertVariant } from '../AlertContext';
import ElementFragments from '../ElementFragments';
import Button from '../Button';

import { genericMemo } from '../../utils';

import styles from './styles.css';

const alertVariantToClassNameMap: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [key in AlertVariant]: string;
} = {
    success: styles.success,
    error: styles.error,
    info: styles.info,
};

const icon: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [key in AlertVariant]: React.ReactNode;
} = {
    success: <IoCheckmarkCircle className={styles.icon} />,
    error: <IoWarning className={styles.icon} />,
    info: <IoInformationCircle className={styles.icon} />,
};

// TODO: Get this value from CSS vars
const TRANSITION_DURATION = 500;
// 300 + 200
// duration-transition-medium + duration-delay-short

export interface Props<N> {
    name: N;
    className?: string;
    variant?: AlertVariant;
    children: React.ReactNode;
    duration?: number;
    nonDismissable?: boolean;
    onCloseButtonClick?: (name: N, removalDelay: number) => void;
    onTimeout?: (name: N, removalDelay: number) => void;
    hideIcon?: boolean;
}

function Alert<N extends string>(props: Props<N>) {
    const {
        name,
        className,
        variant = 'info',
        children,
        onCloseButtonClick,
        nonDismissable,
        duration = 0,
        onTimeout,
        hideIcon,
    } = props;

    const alertElementRef = React.useRef<HTMLDivElement>(null);
    const hideTimeout = React.useRef<number | undefined>();
    const [hidden, setHidden] = React.useState(false);

    React.useEffect(() => {
        const { current: el } = alertElementRef;
        if (el) {
            const bcr = el.getBoundingClientRect();
            el.style.setProperty(
                '--height',
                `${bcr.height}px`,
            );
        }
    }, []);

    React.useEffect(() => {
        window.clearTimeout(hideTimeout.current);

        if (duration > 0 && duration !== Infinity) {
            hideTimeout.current = window.setTimeout(() => {
                setHidden(true);
                if (onTimeout) {
                    onTimeout(name, TRANSITION_DURATION);
                }
            }, duration);
        }

        return () => {
            window.clearTimeout(hideTimeout.current);
        };
    }, [duration, setHidden, onTimeout, name]);

    const handleCloseButtonClick = React.useCallback(() => {
        setHidden(true);
        if (onCloseButtonClick) {
            onCloseButtonClick(name, TRANSITION_DURATION);
        }
    }, [onCloseButtonClick, name]);

    return (
        <div
            ref={alertElementRef}
            className={_cs(
                styles.alert,
                className,
                alertVariantToClassNameMap[variant],
                hidden && styles.hidden,
            )}
        >
            {!hidden && (
                <ElementFragments
                    icons={!hideIcon && icon[variant]}
                    childrenContainerClassName={styles.content}
                    iconsContainerClassName={styles.iconContainer}
                    actionsContainerClassName={styles.actionContainer}
                    actions={!nonDismissable && (
                        <Button
                            className={styles.closeButton}
                            name={undefined}
                            onClick={handleCloseButtonClick}
                            variant="action"
                            disabled={hidden}
                        >
                            <IoClose className={styles.icon} />
                        </Button>
                    )}
                >
                    { children }
                </ElementFragments>
            )}
        </div>
    );
}

export default genericMemo(Alert);