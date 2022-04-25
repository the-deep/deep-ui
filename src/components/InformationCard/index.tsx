import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import NumberOutput from '../NumberOutput';
import InformationCardFragments, {
    InformationVariant,
} from '../InformationCardFragments';

import styles from './styles.css';

export interface Props {
    className?: string;
    icon?: React.ReactNode;
    label: string;
    value?: number;
    variant: InformationVariant;
    valuePrecision?: number;
    coloredBackground?: boolean;
    emptyContent?: React.ReactNode;
}

const styleMap: {
    [key in InformationVariant]: string;
} = {
    accent: styles.accent,
    complement1: styles.complement1,
    complement2: styles.complement2,
    complement3: styles.complement3,
};

function InformationCard(props: Props) {
    const {
        className,
        icon,
        label,
        value,
        variant = 'accent',
        valuePrecision = 0,
        coloredBackground,
        emptyContent = 0,
    } = props;

    return (
        <div
            className={_cs(
                styles.informationCard,
                className,
                coloredBackground && styles.coloredBackground,
                styleMap[variant],
            )}
        >
            <InformationCardFragments
                variant={variant}
                coloredBackground={coloredBackground}
                icon={icon}
                value={(
                    <NumberOutput
                        value={value}
                        invalidText={emptyContent}
                        precision={valuePrecision}
                    />
                )}
                label={label}
                labelContainerClassName={styles.labelContainer}
            />
        </div>
    );
}

export default genericMemo(InformationCard);
