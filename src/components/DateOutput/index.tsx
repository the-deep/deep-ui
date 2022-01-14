import React from 'react';
import {
    populateFormat,
    breakFormat,
    isTruthyString,
    isNotDefined,
    _cs,
} from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import styles from './styles.css';

export interface Props {
    className?: string;
    value: string | number | undefined | null;
    format?: string;
    emptyComponent?: React.ReactNode;
    tooltip?: string | null | undefined,
}

function DateOutput(props: Props) {
    const {
        value,
        format = 'dd MMM, yyyy',
        className,
        emptyComponent = '-',
        tooltip,
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

    const formattedDate = formattedValueList?.map((v) => v.value)?.join('');

    return (
        <div
            className={_cs(styles.dateOutput, className)}
            title={tooltip ?? undefined}
        >
            {isTruthyString(formattedDate) ? (
                formattedDate
            ) : (
                emptyComponent
            )}
        </div>
    );
}

export default genericMemo(DateOutput);
