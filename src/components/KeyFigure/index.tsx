import React from 'react';
import { _cs } from '@togglecorp/fujs';

import TextOutput from '../TextOutput';
import { genericMemo } from '../../utils';
import { SpacingTypes } from '../../types';

import styles from './styles.css';

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
    label: string;
    value?: number;
    valueClassName?: string;
    descriptionClassName?: string;
    spacing?: SpacingTypes;
    small?: boolean;
}

function KeyFigure(props: Props) {
    const {
        className,
        label,
        spacing = 'comfortable',
        valueClassName,
        descriptionClassName,
        small,
        value,
    } = props;

    return (
        <TextOutput
            className={_cs(
                styles.keyFigure,
                className,
                spacingToStyleMap[spacing],
            )}
            value={value}
            valueType="number"
            valueContainerClassName={_cs(
                styles.value,
                small && styles.small,
                valueClassName,
            )}
            descriptionContainerClassName={_cs(
                styles.description,
                small && styles.small,
                descriptionClassName,
            )}
            description={label}
        />
    );
}

export default genericMemo(KeyFigure);
