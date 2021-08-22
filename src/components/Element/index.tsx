import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ElementFragments, {
    Props as ElementFragmentProps,
} from '../ElementFragments';

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

export interface Props extends ElementFragmentProps {
    className?: string;
    fitContent?: boolean;
    elementRef?: React.RefObject<HTMLDivElement>;
}

function Element(props: Props) {
    const {
        className,
        spacing = 'comfortable',
        fitContent,
        elementRef,
        ...elementFragmentProps
    } = props;

    return (
        <div
            className={_cs(
                styles.element,
                spacingToStyleMap[spacing],
                fitContent && styles.fitContent,
                className,
            )}
            ref={elementRef}
        >
            <ElementFragments
                spacing={spacing}
                {...elementFragmentProps}
            />
        </div>
    );
}

export default Element;
