import React from 'react';
import { _cs } from '@togglecorp/fujs';

import DateOutput, { Props as DateOutputProps } from '../DateOutput';
import styles from './styles.css';

export interface Props {
    className?: string;
    startDate: DateOutputProps['value'];
    endDate: DateOutputProps['value'];
    format?: DateOutputProps['format'];
}

function DateRangeOutput(props: Props) {
    const {
        className,
        startDate,
        endDate,
        format,
    } = props;

    return (
        <div className={_cs(styles.dateRangeOutput, className)}>
            <DateOutput
                value={startDate}
                format={format}
            />
            <div className={styles.separator}>-</div>
            <DateOutput
                value={endDate}
                format={format}
            />
        </div>
    );
}

export default DateRangeOutput;
