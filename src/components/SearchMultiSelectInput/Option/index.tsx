import React from 'react';
import {
    IoCheckbox,
    IoSquareOutline,
} from 'react-icons/io5';

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
        <>
            <div className={styles.icon}>
                { isActive ? <IoCheckbox /> : <IoSquareOutline /> }
            </div>
            <div className={styles.label}>
                { children }
            </div>
        </>
    );
}

export default Option;
