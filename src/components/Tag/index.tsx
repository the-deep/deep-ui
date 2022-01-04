import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Element, {
    Props as ElementProps,
} from '../Element';

import { genericMemo } from '../../utils';
import styles from './styles.css';

export type TagVariant = (
    'default'
    | 'accent'
    | 'complement1'
    | 'complement2'
    | 'gradient1'
    | 'gradient2'
    | 'gradient3'
    | 'gradient4'
)

const tagVariantToClassName: {
    [key in TagVariant]: string;
} = {
    default: styles.default,
    accent: styles.accent,
    complement1: styles.complement1,
    complement2: styles.complement2,
    gradient1: styles.gradient1,
    gradient2: styles.gradient2,
    gradient3: styles.gradient3,
    gradient4: styles.gradient4,
};

export interface Props extends ElementProps {
    className?: string;
    variant?: TagVariant;
}

function Tag(props: Props) {
    const {
        className,
        variant = 'default',
        ...otherProps
    } = props;

    return (
        <Element
            className={_cs(
                className,
                styles.tag,
                tagVariantToClassName[variant],
            )}
            fitContent
            {...otherProps}
        />
    );
}

export default genericMemo(Tag);
