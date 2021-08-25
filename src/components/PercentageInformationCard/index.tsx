import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import NumberOutput, { Props as NumberOutputProps } from '../NumberOutput';
import CircularProgressBar from '../CircularProgressBar';
import InformationCardFragments, { InformationVariant } from '../InformationCardFragments';

import styles from './styles.css';

export interface Props {
    className?: string;
    icon?: React.ReactNode;
    label: string;
    value?: number;
    variant: InformationVariant;
    valuePrecision?: NumberOutputProps['precision'];
    coloredBackground?: boolean;
}

const styleMap: {
    [key in InformationVariant]: string;
} = {
    accent: styles.accent,
    complement1: styles.complement1,
    complement2: styles.complement2,
    complement3: styles.complement3,
};

function PercentageInformationCard(props: Props) {
    const {
        className,
        icon,
        label,
        value = 0,
        variant = 'accent',
        valuePrecision = 0,
        coloredBackground,
    } = props;

    return (
        <div
            className={_cs(
                styles.percentageInformationCard,
                className,
                coloredBackground && styles.coloredBackground,
                styleMap[variant],
            )}
        >
            <InformationCardFragments
                variant={variant}
                coloredBackground={coloredBackground}
                valueContainerClassName={styles.valueContainer}
                icon={(
                    <CircularProgressBar
                        width={54}
                        arcWidth={4}
                        value={value}
                        className={styles.chart}
                        unfilledArcClassName={styles.unfilledArc}
                        filledArcClassName={styles.filledArc}
                    >
                        {icon && (
                            <div className={styles.iconContainer}>
                                {icon}
                            </div>
                        )}
                    </CircularProgressBar>
                )}
                value={(
                    <NumberOutput
                        value={value}
                        precision={valuePrecision}
                        suffix="%"
                    />
                )}
                label={label}
            />
        </div>
    );
}

export default genericMemo(PercentageInformationCard);
