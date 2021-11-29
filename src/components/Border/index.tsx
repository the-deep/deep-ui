import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { SpacingTypes } from '../../types';
import { genericMemo } from '../../utils';
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

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
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
    inline?: boolean;

    // NOTE: only for horizontal borders
    extendToSpacing?: boolean;
    spacing?: SpacingTypes;
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
        inline,
        spacing = 'comfortable',
        extendToSpacing,
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
                !inline && styles.absolutelyPositioned,
                spacingToStyleMap[spacing],
                extendToSpacing && styles.extendToSpacing,
                className,
            )}
        >
            {active && <div className={styles.activeBorder} />}
        </div>
    );
}

export default genericMemo(Border);
