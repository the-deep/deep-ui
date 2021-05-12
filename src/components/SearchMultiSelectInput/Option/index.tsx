import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

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
                { isActive ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
            </div>
            <div className={styles.label}>
                { children }
            </div>
        </>
    );
}

export default Option;
