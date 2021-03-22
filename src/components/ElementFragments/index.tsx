import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    children?: React.ReactNode;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsClassName?: string;
    childrenClassName?: string;
    actionsClassName?: string;
}

function ElementFragments(props: Props) {
    const {
        actionsClassName,
        iconsClassName,
        childrenClassName,
        children,
        icons,
        actions,
    } = props;

    return (
        <>
            {icons && (
                <div className={_cs(iconsClassName, styles.icons)}>
                    {icons}
                </div>
            )}
            {children && (
                <div className={_cs(childrenClassName, styles.children)}>
                    {children}
                </div>
            )}
            {actions && (
                <div className={_cs(actionsClassName, styles.actions)}>
                    {actions}
                </div>
            )}
        </>
    );
}

export default ElementFragments;
