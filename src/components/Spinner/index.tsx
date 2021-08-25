import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import styles from './styles.css';

const points = [
    [0.5, 0],
    [0.854, 0.146],
    [1, 0.5],
    [0.854, 0.854],
    [0.5, 1],
    [0.146, 0.854],
    [0, 0.5],
    [0.146, 0.146],
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
                        className={styles.point}
                        style={{
                            left: `${100 * point[0]}%`,
                            top: `${100 * point[1]}%`,
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
