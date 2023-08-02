import React from 'react';
import {
    _cs,
    isNotDefined,
} from '@togglecorp/fujs';
import { genericMemo } from '../../utils';

import styles from './styles.css';

type ColorVariantTypes = 'brand' | 'accent' | 'default';
type SizeTypes = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

const colorVariantToStyleMap: {
    [key in ColorVariantTypes]: string;
} = {
    brand: styles.brand,
    accent: styles.accent,
    default: styles.default,
};

const sizeToStyleMap: {
    [key in SizeTypes]: string;
} = {
    extraSmall: styles.extraSmall,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
};

function isString(d: unknown): d is string {
    return (typeof d) === 'string';
}

export interface Props {
    className?: string;
    children?: React.ReactNode;
    size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
    title?: string;
    colorVariant?: ColorVariantTypes;
    ellipsize?: boolean;
    ellipsizeContainerClassName?: string;
}

function Heading(props: Props) {
    const {
        className: classNameFromProps,
        children,
        size = 'medium',
        title: titleFromProps,
        colorVariant = 'default',
        ellipsize,
        ellipsizeContainerClassName,
    } = props;

    let title = titleFromProps;

    if (ellipsize && isNotDefined(titleFromProps) && isString(children)) {
        title = children;
    }

    const className = _cs(
        styles.heading,
        ellipsize && styles.ellipsize,
        sizeToStyleMap[size],
        colorVariantToStyleMap[colorVariant],
        classNameFromProps,
    );

    const heading = (
        <>
            {size === 'extraSmall' && (
                <h5
                    className={className}
                    title={title}
                >
                    { children }
                </h5>
            )}
            {size === 'small' && (
                <h4
                    className={className}
                    title={title}
                >
                    { children }
                </h4>
            )}
            {size === 'medium' && (
                <h3
                    className={className}
                    title={title}
                >
                    { children }
                </h3>
            )}
            {size === 'large' && (
                <h2
                    className={className}
                    title={title}
                >
                    { children }
                </h2>
            )}
            {size === 'extraLarge' && (
                <h1
                    className={className}
                    title={title}
                >
                    { children }
                </h1>
            )}
        </>
    );

    if (ellipsize) {
        return (
            <div className={_cs(styles.ellipsizeContainer, ellipsizeContainerClassName)}>
                {heading}
            </div>
        );
    }

    return heading;
}

export default genericMemo(Heading);
