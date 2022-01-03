import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ElementFragments from '../ElementFragments';
import QuickActionGroup from '../QuickActionGroup';
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
    actions?: React.ReactNode;
    actionsContainerClassName?: string;
    children?: React.ReactNode;
    childrenContainerClassName?: string;
    className?: string;
    icons?: React.ReactNode;
    iconsContainerClassName?: string;
    quickActions?: React.ReactNode;
    quickActionsContainerClassName?: string;
    spacing?: SpacingTypes;
}

function Footer(props: Props) {
    const {
        className,
        actionsContainerClassName,
        actions,
        childrenContainerClassName,
        iconsContainerClassName,
        children,
        icons,
        quickActions,
        quickActionsContainerClassName,
        spacing = 'comfortable',
    } = props;

    return (
        <footer
            className={_cs(
                className,
                styles.footer,
                spacingToStyleMap[spacing],
            )}
        >
            <ElementFragments
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                actions={(
                    <>
                        {actions}
                        {quickActions && (
                            <QuickActionGroup
                                className={quickActionsContainerClassName}
                            >
                                {quickActions}
                            </QuickActionGroup>
                        )}
                    </>
                )}
                actionsContainerClassName={actionsContainerClassName}
                childrenContainerClassName={childrenContainerClassName}
                spacing={spacing}
            >
                { children }
            </ElementFragments>
        </footer>
    );
}

export default genericMemo(Footer);
