import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Actions from '../Actions';

import styles from './styles.css';

export interface Props {
    className?: string;
    actionsContainerClassName?: string;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    contentClassName?: string;
}

function Footer(props: Props) {
    const {
        className,
        actionsContainerClassName,
        actions,
        contentClassName,
        children,
    } = props;

    return (
        <div className={_cs(className, styles.footer)}>
            <div className={_cs(contentClassName, styles.content)}>
                { children }
            </div>
            { actions && (
                <Actions className={_cs(styles.actions, actionsContainerClassName)}>
                    { actions }
                </Actions>
            )}
        </div>
    );
}

export default Footer;
