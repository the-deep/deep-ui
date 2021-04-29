import React from 'react';
import {
    populateFormat,
    breakFormat,
    _cs,
} from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    value: string | number;
    format: string;
}

function DateOutput(props: Props) {
    const {
        value,
        format = 'dd-MM-yyyy',
        className,
    } = props;

    const date = new Date(value);
    const formattedValueList = populateFormat(breakFormat(format), date);
    const formattedDate = formattedValueList.find((d) => d.type === 'date');

    return (
        <div className={_cs(styles.dateOutput, className)}>
            {formattedDate?.value}
        </div>
    );
}

export default DateOutput;
