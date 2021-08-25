import React from 'react';

import { genericMemo } from '../../../utils';

export interface Props extends Omit<React.HTMLProps<HTMLTableRowElement>, 'ref'> {
}

function TableRow(props: Props) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <tr
            className={className}
            {...otherProps}
        >
            {children}
        </tr>
    );
}

export default genericMemo(TableRow);
