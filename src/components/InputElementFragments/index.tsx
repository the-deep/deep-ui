import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props {
    children?: React.ReactNode;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsContainerClassName?: string;
    childrenContainerClassName?: string;
    actionsContainerClassName?: string;
}

function ElementFragments(props: Props) {
    const {
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        children,
        icons,
        actions,
    } = props;

    return (
        <>
            {icons && (
                <div className={_cs(iconsContainerClassName, styles.icons)}>
                    {icons}
                </div>
            )}
            {children && (
                <div className={_cs(childrenContainerClassName, styles.children)}>
                    {children}
                </div>
            )}
            {actions && (
                <div className={_cs(actionsContainerClassName, styles.actions)}>
                    {actions}
                </div>
            )}
        </>
    );
}

export default genericMemo(ElementFragments);
