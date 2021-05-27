import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
}

function QuickActionGroup(props: Props) {
    const {
        className,
        children,
    } = props;

    return (
        <div className={_cs(styles.quickActionGroup, className)}>
            { children }
        </div>
    );
}

export default QuickActionGroup;
