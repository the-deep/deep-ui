import React from 'react';
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
}

function Option(props: Props) {
    const {
        children,
        isActive,
    } = props;

    return (
        <ElementFragments
            icons={isActive ? <IoCheckbox /> : <IoSquareOutline />}
            childrenContainerClassName={styles.labelContainer}
        >
            <div
                className={styles.label}
                title={typeof children === 'string' ? children : undefined}
            >
                { children }
            </div>
        </ElementFragments>
    );
}

export default genericMemo(Option);
