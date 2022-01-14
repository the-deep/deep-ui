import React from 'react';
import { isNotDefined } from '@togglecorp/fujs';

import { genericMemo } from '../../../utils';

export interface CellProps<T>{
    className?: string;
    value: T | null | undefined;
    tooltip?: string | null | undefined,
}

function Cell<T>(props: CellProps<T>) {
    const {
        className,
        value,
        tooltip,
    } = props;

    if (isNotDefined(value)) {
        return null;
    }

    return (
        <div
            className={className}
            title={tooltip ?? undefined}
        >
            {value}
        </div>
    );
}

export default genericMemo(Cell);
