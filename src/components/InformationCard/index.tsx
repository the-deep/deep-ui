import React from 'react';
import { _cs } from '@togglecorp/fujs';

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
        value = 0,
        variant = 'accent',
        valuePrecision = 0,
        coloredBackground,
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
                        precision={valuePrecision}
                    />
                )}
                label={label}
            />
        </div>
    );
}

export default InformationCard;
