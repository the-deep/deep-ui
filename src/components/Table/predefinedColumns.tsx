import React, { useContext, useCallback } from 'react';
import {
    compareString,
    compareNumber,
} from '@togglecorp/fujs';
import {
    IoChevronDown,
    IoChevronForward,
} from 'react-icons/io5';

import Button from '../Button';
import HeaderCell, { HeaderCellProps } from './HeaderCell';
import Cell, { CellProps } from './Cell';
import NumberOutput, { Props as NumberOutputProps } from '../NumberOutput';

import { Column } from './index';
import { SortDirection, FilterType } from './types';
import { RowExpansionContext } from './useRowExpansion';

interface ExpandButtonProps<T extends string | number | undefined> {
    id: T,
}
function ExpandButton<T extends string | number | undefined>(props: ExpandButtonProps<T>) {
    const {
        id,
    } = props;
    const {
        expandedRowKey,
        setExpandedRowKey,
    } = useContext(RowExpansionContext);

    const handleClick = useCallback(
        () => {
            const rowKey = id as string | number | undefined;
            setExpandedRowKey(
                (oldValue) => (oldValue === rowKey ? undefined : rowKey),
            );
        },
        [setExpandedRowKey, id],
    );

    return (
        <Button
            name={undefined}
            variant="action"
            onClick={handleClick}
        >
            {id === expandedRowKey ? <IoChevronDown /> : <IoChevronForward />}
        </Button>
    );
}

export function createStringColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => string | undefined | null,
    options?: {
        cellAsHeader?: boolean,
        sortable?: boolean,
        defaultSortDirection?: SortDirection,
        filterType?: FilterType,
        orderable?: boolean;
        hideable?: boolean;
        columnClassName?: string;
        columnWidth?: Column<D, K, CellProps<string>, HeaderCellProps>['columnWidth'];
        columnStyle?: Column<D, K, CellProps<string>, HeaderCellProps>['columnStyle'];
    },
) {
    const item: Column<D, K, CellProps<string>, HeaderCellProps> & {
        valueSelector: (item: D) => string | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        cellAsHeader: options?.cellAsHeader,
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRenderer: Cell,
        cellRendererParams: (_: K, datum: D): CellProps<string> => ({
            value: accessor(datum),
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareString(accessor(foo), accessor(bar)),
        columnClassName: options?.columnClassName,
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createNumberColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => number | undefined | null,
    options?: {
        cellAsHeader?: boolean,
        sortable?: boolean,
        defaultSortDirection?: SortDirection,
        filterType?: FilterType,
        orderable?: boolean;
        hideable?: boolean;
        columnClassName?: string;
        columnWidth?: Column<D, K, CellProps<string>, HeaderCellProps>['columnWidth'];
        columnStyle?: Column<D, K, CellProps<string>, HeaderCellProps>['columnStyle'];
    },
) {
    const item: Column<D, K, NumberOutputProps, HeaderCellProps> & {
        valueSelector: (item: D) => number | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        cellAsHeader: options?.cellAsHeader,
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRenderer: NumberOutput,
        cellRendererParams: (_: K, datum: D): NumberOutputProps => ({
            // Note override null with undefined
            value: accessor(datum) ?? undefined,
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareNumber(accessor(foo), accessor(bar)),
        columnClassName: options?.columnClassName,
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createExpandColumn<D, K extends number | string | undefined>(
    id: string,
    title: string,
    options?: {
        columnClassName?: string;
        headerCellRendererClassName?: string;
        headerContainerClassName?: string;
        cellRendererClassName?: string;
        cellContainerClassName?: string;
        columnWidth?: Column<D, K, ExpandButtonProps<K>, HeaderCellProps>['columnWidth'];
        columnStyle?: Column<D, K, ExpandButtonProps<K>, HeaderCellProps>['columnStyle'];
    },
) {
    const item: Column<D, K, ExpandButtonProps<K>, HeaderCellProps> = {
        id,
        title,
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            sortable: false,
        },
        columnClassName: options?.columnClassName,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: ExpandButton,
        cellRendererParams: (rowId: K) => ({
            id: rowId,
        }),
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}
