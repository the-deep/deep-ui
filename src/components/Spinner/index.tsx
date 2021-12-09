import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import styles from './styles.css';

const points = [
    { left: 0.5, top: 0, key: 1 },
    { left: 0.854, top: 0.146, key: 2 },
    { left: 1, top: 0.5, key: 3 },
    { left: 0.854, top: 0.854, key: 4 },
    { left: 0.5, top: 1, key: 5 },
    { left: 0.146, top: 0.854, key: 6 },
    { left: 0, top: 0.5, key: 7 },
    { left: 0.146, top: 0.146, key: 8 },
];

export interface Props {
    className?: string;
    inheritColor?: boolean;
}

function Spinner(props: Props) {
    const {
        className,
        inheritColor,
    } = props;

    return (
        <div
            className={_cs(
                styles.spinner,
                inheritColor && styles.inheritColor,
                className,
            )}
        >
            <div className={styles.pointsContainer}>
                {points.map((point, i) => (
                    <div
                        key={point.key}
                        className={styles.point}
                        style={{
                            left: `${100 * point.left}%`,
                            top: `${100 * point.top}%`,
                            animationDelay: `calc(${i} * var(--dui-duration-delay-short))`,
                            animationDuration: `calc(${points.length} * var(--dui-duration-delay-short))`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default genericMemo(Spinner);
