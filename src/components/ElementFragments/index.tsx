import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Icons from '../Icons';
import Actions from '../Actions';

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
                <Icons className={_cs(iconsContainerClassName, styles.icons)}>
                    {icons}
                </Icons>
            )}
            <div className={_cs(childrenContainerClassName, styles.children)}>
                {children}
            </div>
            {actions && (
                <Actions className={actionsContainerClassName}>
                    {actions}
                </Actions>
            )}
        </>
    );
}

export default ElementFragments;
