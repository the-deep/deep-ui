import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoCheckbox,
    IoSquareOutline,
} from 'react-icons/io5';

import { genericMemo } from '../../../utils';
import ElementFragments from '../../ElementFragments';

import styles from './styles.css';

export interface Props {
    children: React.ReactNode;
    isActive: boolean;
    ellipsize?: boolean;
}

function Option(props: Props) {
    const {
        children,
        isActive,
        ellipsize = false,
    } = props;

    return (
        <ElementFragments
            icons={isActive ? <IoCheckbox /> : <IoSquareOutline />}
            childrenContainerClassName={styles.labelContainer}
        >
            <div
                className={_cs(styles.label, ellipsize && styles.ellipsis)}
                title={typeof children === 'string' ? children : undefined}
            >
                { children }
            </div>
        </ElementFragments>
    );
}

export default genericMemo(Option);
