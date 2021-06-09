import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
    size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
    title?: string;
}

function Heading(props: Props) {
    const {
        className,
        children,
        size = 'medium',
        title,
    } = props;

    return (
        <>
            {size === 'extraSmall' && (
                <h5
                    className={_cs(styles.heading, styles.extraSmall, className)}
                    title={title}
                >
                    { children }
                </h5>
            )}
            {size === 'small' && (
                <h4
                    className={_cs(styles.heading, styles.small, className)}
                    title={title}
                >
                    { children }
                </h4>
            )}
            {size === 'medium' && (
                <h3
                    className={_cs(styles.heading, styles.medium, className)}
                    title={title}
                >
                    { children }
                </h3>
            )}
            {size === 'large' && (
                <h2
                    className={_cs(styles.heading, styles.large, className)}
                    title={title}
                >
                    { children }
                </h2>
            )}
            {size === 'extraLarge' && (
                <h1
                    className={_cs(styles.heading, styles.extraLarge, className)}
                    title={title}
                >
                    { children }
                </h1>
            )}
        </>
    );
}

export default Heading;
