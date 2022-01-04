import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { SpacingTypes } from '../../types';
import { genericMemo } from '../../utils';
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
    children?: React.ReactNode;
    spacing?: SpacingTypes;
}

function QuickActionGroup(props: Props) {
    const {
        className,
        children,
        spacing = 'comfortable',
    } = props;

    return (
        <div
            className={_cs(
                styles.quickActionGroup,
                spacingToStyleMap[spacing],
                className,
            )}
        >
            { children }
        </div>
    );
}

export default genericMemo(QuickActionGroup);
