import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    value?: string;
}

function TimeOutput(props: Props) {
    const {
        className,
        value,
    } = props;

    return (
        <div className={_cs(styles.timeOutput, className)}>
            {value ?? '-'}
        </div>
    );
}

export default TimeOutput;
