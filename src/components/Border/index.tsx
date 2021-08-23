import React, { memo } from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

type PositionTypes = 'top' | 'right' | 'bottom' | 'left';
type WidthTypes = 'thin' | 'medium' | 'thick' | 'dense';
const positionToStyleMap: {
    [key in PositionTypes]: string;
} = {
    top: styles.top,
    right: styles.right,
    bottom: styles.bottom,
    left: styles.left,
};

const widthToStyleMap: {
    [key in WidthTypes]: string;
} = {
    thin: styles.thin,
    medium: styles.medium,
    thick: styles.thick,
    dense: styles.dense,
};

export interface Props {
    className?: string;
    active?: boolean;
    errored?: boolean;
    position?: PositionTypes;
    disabled?: boolean;
    transparent?: boolean;
    fullWidthActiveBorder?: boolean;
    width?: WidthTypes;
}

function Border(props: Props) {
    const {
        className,
        active,
        errored,
        position = 'bottom',
        disabled,
        transparent,
        fullWidthActiveBorder,
        width = 'medium',
    } = props;

    return (
        <div
            className={_cs(
                styles.border,
                active && styles.active,
                errored && styles.errored,
                positionToStyleMap[position] ?? styles.bottom,
                disabled && styles.disabled,
                transparent && styles.transparent,
                fullWidthActiveBorder && styles.fullWidthActiveBorder,
                widthToStyleMap[width],
                className,
            )}
        >
            {active && <div className={styles.activeBorder} />}
        </div>
    );
}

export default memo(Border);
