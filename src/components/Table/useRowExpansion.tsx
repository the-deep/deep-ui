import React, { createContext, useState } from 'react';
import { _cs } from '@togglecorp/fujs';

import { RowOptions } from './index';
import TableRow from './TableRow';
import TableData from './TableData';

interface RowExpansionContextInterface {
    expandedRowKey: string | number | undefined;
    setExpandedRowKey: React.Dispatch<React.SetStateAction<string | number | undefined>>;
}
const initialValue: RowExpansionContextInterface = {
    expandedRowKey: undefined,
    setExpandedRowKey: (value: unknown) => {
        console.warn('Trying to set to ', value);
    },
};
export const RowExpansionContext = createContext<RowExpansionContextInterface>(initialValue);

// FIXME: may need to change return type to JSX.Element and use as jsx to use memoized component
export type ExpansionRowChildrenProps<D, K> = (rowOptions: RowOptions<D, K>) => React.ReactNode;
export interface ExpansionOptions {
    expandedRowClassName?: string;
    expandedCellClassName?: string;
    expansionRowClassName?: string;
    expansionCellClassName?: string;
}

function useRowExpansion<D, K extends string | number>(
    expansionRowChildren: ExpansionRowChildrenProps<D, K>,
    options: ExpansionOptions = {},
    expandOnRowClick = false,
) {
    const [expandedRowKey, setExpandedRowKey] = useState<string | number | undefined>();

    const {
        expandedRowClassName,
        expandedCellClassName,
        expansionCellClassName,
        expansionRowClassName,
    } = options;

    const rowModifier: (
        o: RowOptions<D, K>
    ) => React.ReactNode = React.useCallback((rowOptions) => {
        const {
            rowKey,
            row,
            columns,
        } = rowOptions;

        const isActive = rowKey === expandedRowKey as (K | undefined);

        const newRowProps = {
            className: _cs(
                row.props.className,
                isActive && expandedRowClassName,
            ),
            children: row.props.children.map((cell: React.ReactElement) => (
                React.cloneElement(cell, {
                    className: _cs(
                        cell.props.className,
                        isActive && expandedCellClassName,
                    ),
                })
            )),
        };

        let newRow;
        if (expandOnRowClick) {
            newRow = React.cloneElement(row, {
                ...newRowProps,
                key: rowKey,
                onClick: () => {
                    setExpandedRowKey((oldValue) => (
                        oldValue === rowKey ? undefined : rowKey
                    ));
                },
            });
        } else {
            newRow = React.cloneElement(row, newRowProps);
        }

        return (
            <React.Fragment
                key={`${rowKey}-fragment`}
            >
                {newRow}
                {isActive && (
                    <TableRow
                        key={`${rowKey}-expanded`}
                        className={expansionRowClassName}
                    >
                        <TableData
                            colSpan={columns.length}
                            className={expansionCellClassName}
                        >
                            { expansionRowChildren(rowOptions) }
                        </TableData>
                    </TableRow>
                )}
            </React.Fragment>
        );
    }, [
        expandedRowKey,
        setExpandedRowKey,
        expansionRowChildren,
        expandedRowClassName,
        expandedCellClassName,
        expansionRowClassName,
        expansionCellClassName,
        expandOnRowClick,
    ]);

    return [rowModifier, expandedRowKey, setExpandedRowKey] as const;
}

export default useRowExpansion;
