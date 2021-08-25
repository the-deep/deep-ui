import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import styles from './styles.css';

export interface Props {
    className?: string;
    value: string | undefined | null;
    invalidText?: React.ReactNode;
}

function TimeOutput(props: Props) {
    const {
        className,
        value,
        invalidText = '-',
    } = props;

    return (
        <div className={_cs(styles.timeOutput, className)}>
            {value ?? invalidText}
        </div>
    );
}

export default genericMemo(TimeOutput);
