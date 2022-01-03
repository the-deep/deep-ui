import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Icons from '../Icons';
import Actions from '../Actions';
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
    children?: React.ReactNode;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsContainerClassName?: string;
    childrenContainerClassName?: string;
    actionsContainerClassName?: string;

    wrapActions?: boolean;
    wrapIcons?: boolean;

    allowIconsShrink?: boolean;
    allowActionsShrink?: boolean;
    spacing?: SpacingTypes;
}

function ElementFragments(props: Props) {
    const {
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        children,
        icons,
        actions,
        wrapIcons,
        wrapActions,
        allowActionsShrink,
        allowIconsShrink,
        spacing = 'comfortable',
    } = props;

    return (
        <>
            {icons && (
                <Icons
                    wrap={wrapIcons}
                    allowShrink={allowIconsShrink}
                    className={_cs(iconsContainerClassName, styles.icons)}
                    spacing={spacing}
                >
                    {icons}
                </Icons>
            )}
            <div
                className={_cs(
                    styles.children,
                    childrenContainerClassName,
                    spacingToStyleMap[spacing],
                )}
            >
                {children}
            </div>
            {actions && (
                <Actions
                    wrap={wrapActions}
                    allowShrink={allowActionsShrink}
                    className={actionsContainerClassName}
                    spacing={spacing}
                >
                    {actions}
                </Actions>
            )}
        </>
    );
}

export default genericMemo(ElementFragments);
