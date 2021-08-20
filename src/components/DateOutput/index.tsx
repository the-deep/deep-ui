import React from 'react';
import {
    populateFormat,
    isNotDefined,
    breakFormat,
    _cs,
} from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    value: string | number | undefined | null;
    format?: string;
    invalidText?: React.ReactNode;
}

function DateOutput(props: Props) {
    const {
        value,
        format = 'dd MMM, yyyy',
        invalidText = '-',
        className,
    } = props;

    const formattedDate = React.useMemo(() => {
        if (isNotDefined(value)) {
            return invalidText;
        }
        const date = new Date(value);
        const formattedValueList = populateFormat(breakFormat(format), date);
        return formattedValueList.find((d) => d.type === 'date')?.value;
    }, [format, value, invalidText]);

    return (
        <div className={_cs(styles.dateOutput, className)}>
            {formattedDate}
        </div>
    );
}

export default DateOutput;
