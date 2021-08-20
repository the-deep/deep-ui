import React, { memo } from 'react';
import { _cs } from '@togglecorp/fujs';

import TimeOutput, { Props as TimeOutputProps } from '../TimeOutput';
import styles from './styles.css';

export interface Props {
    className?: string;
    startTime?: TimeOutputProps['value'];
    endTime?: TimeOutputProps['value'];
}

function TimeRangeOutput(props: Props) {
    const {
        className,
        startTime,
        endTime,
    } = props;

    return (
        <div className={_cs(styles.timeRangeOutput, className)}>
            {startTime && (
                <TimeOutput
                    value={startTime}
                />
            )}
            {startTime && endTime && (
                <div className={styles.separator}>-</div>
            )}
            {endTime && (
                <TimeOutput
                    value={endTime}
                />
            )}
        </div>
    );
}

export default memo(TimeRangeOutput);
