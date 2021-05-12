import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ElementFragments from '../ElementFragments';

import styles from './styles.css';

export interface Props {
    className?: string;
    iconsContainerClassName?: string;
    actionsContainerClassName?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    childrenContainerClassName?: string;
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
    } = props;

    return (
        <footer className={_cs(className, styles.footer)}>
            <ElementFragments
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                actions={actions}
                actionsContainerClassName={actionsContainerClassName}
                childrenContainerClassName={childrenContainerClassName}
            >
                { children }
            </ElementFragments>
        </footer>
    );
}

export default Footer;
