import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';

import { BaseHeader } from './types';

import { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableData from './TableData';
import styles from './styles.css';

export type TableVariant = (
    'regular'
    | 'small'
    | 'large'
);

const tableVariantToStyleMap: { [key in TableVariant]: string; } = {
    regular: styles.regular,
    small: styles.small,
    large: styles.large,
};

export interface Column<D, K, C, H> {
    id: string;
    title: string;

    headerCellRenderer: React.ComponentType<H>;
    headerCellRendererParams: Omit<H, keyof BaseHeader>;
    headerCellRendererClassName?: string;
    headerContainerClassName?: string;
    columnClassName?: string;
    columnStyle?: React.CSSProperties;
    columnWidth?: number | string;

    cellRenderer: React.ComponentType<C>;
    cellRendererParams: (key: K, datum: D, index: number) => Omit<C, 'className'>;
    cellRendererClassName?: string;
    cellContainerClassName?: string;

    cellAsHeader?: boolean;
}

type VerifyColumn<T, D, K> = unknown extends (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Column<D, K, any, any>
        ? never
        : unknown
)
    ? never
    : unknown

export interface RowOptions<D, K> {
    rowKey: K,
    row: React.ReactElement;
    cells: React.ReactElement[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: Column<D, K, any, any>[];
    datum: D,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Props<D, K extends string | number, C extends Column<D, K, any, any>> {
    className?: string;
    caption?: React.ReactNode;
    keySelector: (data: D, index: number) => K;
    columns: C[] & VerifyColumn<C, D, K>;
    data: D[] | undefined | null;
    captionClassName?: string;
    headerRowClassName?: string;
    headerCellClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
    uiMode?: UiMode;
    variant?: TableVariant;
    rowModifier?: (rowOptions: RowOptions<D, K>) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<D, K extends string | number, C extends Column<D, K, any, any>>(
    props: Props<D, K, C>,
) {
    const {
        data,
        keySelector,
        columns,
        caption,

        className,
        captionClassName,
        headerRowClassName,
        headerCellClassName,
        rowClassName,
        cellClassName,
        uiMode,
        variant = 'regular',
        rowModifier,
    } = props;

    const themeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    return (
        <table
            className={_cs(
                styles.table,
                tableVariantToStyleMap[variant],
                themeClassName,
                className,
            )}
        >
            {caption && (
                <caption className={captionClassName}>
                    {caption}
                </caption>
            )}
            <colgroup>
                {columns.map((column) => {
                    const {
                        id,
                        columnClassName,
                        columnStyle,
                        columnWidth,
                    } = column;

                    const style = {
                        ...columnStyle,
                        width: isDefined(columnWidth) ? columnWidth : columnStyle?.width,
                    };

                    return (
                        <col
                            style={style}
                            key={id}
                            className={columnClassName}
                        />
                    );
                })}
            </colgroup>
            <thead>
                <TableRow className={_cs(styles.headerRow, headerRowClassName)}>
                    {columns.map((column, index) => {
                        const {
                            id,
                            title,
                            headerCellRenderer: Renderer,
                            headerCellRendererClassName,
                            cellAsHeader,
                            headerCellRendererParams,
                            headerContainerClassName,
                        } = column;

                        const children = (
                            <Renderer
                                {...headerCellRendererParams}
                                name={id}
                                title={title}
                                index={index}
                                className={_cs(headerCellRendererClassName, styles.headerComponent)}
                            />
                        );
                        return (
                            <TableHeader
                                key={id}
                                scope="col"
                                className={_cs(
                                    styles.headerCell,
                                    cellAsHeader && styles.stickLeft,
                                    headerCellClassName,
                                    headerContainerClassName,
                                )}
                            >
                                {children}
                            </TableHeader>
                        );
                    })}
                </TableRow>
            </thead>
            <tbody>
                {data?.map((datum, index) => {
                    const key = keySelector(datum, index);
                    const cells = columns.map((column) => {
                        const {
                            id,
                            cellRenderer: Renderer,
                            cellRendererClassName,
                            cellRendererParams,
                            cellAsHeader,
                            cellContainerClassName,
                        } = column;

                        const otherProps = cellRendererParams(key, datum, index);

                        const children = (
                            <Renderer
                                {...otherProps}
                                className={_cs(cellRendererClassName, styles.cellComponent)}
                            />
                        );

                        if (cellAsHeader) {
                            return (
                                <TableHeader
                                    key={id}
                                    className={_cs(
                                        styles.rowHeaderCell,
                                        cellClassName,
                                        cellContainerClassName,
                                    )}
                                    scope="row"
                                >
                                    {children}
                                </TableHeader>
                            );
                        }
                        return (
                            <TableData
                                key={id}
                                className={_cs(
                                    styles.cell,
                                    cellClassName,
                                    cellContainerClassName,
                                )}
                            >
                                {children}
                            </TableData>
                        );
                    });

                    const row = (
                        <TableRow
                            key={key}
                            className={_cs(styles.row, rowClassName)}
                        >
                            { cells }
                        </TableRow>
                    );

                    let modifiedRow: React.ReactNode = row;

                    if (rowModifier) {
                        modifiedRow = rowModifier({
                            rowKey: key,
                            row,
                            cells,
                            columns,
                            datum,
                        });
                    }

                    return modifiedRow;
                })}
            </tbody>
        </table>
    );
}

export default Table;
