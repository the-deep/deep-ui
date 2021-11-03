import React from 'react';
import { _cs } from '@togglecorp/fujs';

import NumberOutput from '../NumberOutput';
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
    icon: React.ReactNode;
    value: number;
    valuePrecision?: number;
    label?: string;
    spacing?: SpacingTypes;
}

function CompactInformationCard(props: Props) {
    const {
        className,
        icon,
        value,
        valuePrecision,
        label,
        spacing = 'comfortable',
    } = props;

    return (
        <div
            className={_cs(
                styles.compactInformationCard,
                spacingToStyleMap[spacing],
                className,
            )}
        >
            <div className={styles.iconAndValue}>
                <div className={styles.iconContainer}>
                    {icon}
                </div>
                <NumberOutput
                    className={styles.value}
                    value={value}
                    precision={valuePrecision}
                />
            </div>
            <div className={styles.label}>
                {label}
            </div>
        </div>
    );
}

export default CompactInformationCard;
