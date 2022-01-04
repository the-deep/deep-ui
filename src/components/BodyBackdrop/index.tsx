import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';

import Portal from '../Portal';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
}

function BodyBackdrop(props: Props) {
    const {
        children,
        className,
    } = props;

    return (
        <Portal>
            <div className={_cs(className, styles.bodyBackdrop)}>
                { children }
            </div>
        </Portal>
    );
}

export default genericMemo(BodyBackdrop);
