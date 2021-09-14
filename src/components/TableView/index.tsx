import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Table, {
    Props as TableProps,
    Column,
} from '../Table';

import Message, { Props as MessageProps } from '../Message';
import styles from './styles.css';

type MessagePropOmission = 'className' | 'message' | 'compact' | 'icon' | 'empty' | 'pendingContainerClassName';
export type Props<
    D,
    K extends string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    C extends Column<D, K, any, any>,
> = TableProps<
    D,
    K,
    C
> & Omit<MessageProps, MessagePropOmission> & {
    className?: string;
    contentClassName?: string,
    compactEmptyMessage?: boolean;
    compactPendingMessage?: boolean;
};

function TableView<
    D,
    K extends string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    C extends Column<D, K, any, any>,
>(props: Props<D, K, C>) {
    const {
        className,

        pending,
        filtered,
        emptyIcon,
        emptyMessage,
        pendingMessage,
        filteredEmptyIcon,
        filteredEmptyMessage,

        data,
        contentClassName,
        compactEmptyMessage,
        compactPendingMessage,
        ...otherTableProps
    } = props;

    const empty = !(data?.length && data.length > 0);

    return (
        <div
            className={_cs(
                styles.tableView,
                className,
                empty && styles.empty,
                pending && styles.pending,
            )}
        >
            <Table
                className={_cs(styles.table, contentClassName)}
                data={data}
                {...otherTableProps}
            />
            <Message
                empty={empty}
                pending={pending}
                filtered={filtered}
                emptyIcon={emptyIcon}
                emptyMessage={emptyMessage}
                pendingMessage={pendingMessage}
                filteredEmptyIcon={filteredEmptyIcon}
                filteredEmptyMessage={filteredEmptyMessage}
                compactPendingMessage={empty || compactPendingMessage}
                compactEmptyMessage={compactEmptyMessage}
            />
        </div>
    );
}

export default TableView;
