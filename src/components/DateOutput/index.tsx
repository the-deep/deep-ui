import React, { memo } from 'react';
import {
    populateFormat,
    breakFormat,
    isDefined,
    isNotDefined,
    _cs,
} from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    value: string | number | undefined | null;
    format?: string;
    emptyComponent?: React.ReactNode;
}

function DateOutput(props: Props) {
    const {
        value,
        format = 'dd MMM, yyyy',
        className,
        emptyComponent = '-',
    } = props;

    const formattedValueList = React.useMemo(() => {
        if (isNotDefined(value)) {
            return undefined;
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return undefined;
        }

        return populateFormat(breakFormat(format), date);
    }, [format, value]);

    const formattedDate = formattedValueList?.find((d) => d.type === 'date');

    return (
        <div className={_cs(styles.dateOutput, className)}>
            { isDefined(formattedDate) ? (
                formattedDate.value
            ) : (
                emptyComponent
            )}
        </div>
    );
}

export default memo(DateOutput);
