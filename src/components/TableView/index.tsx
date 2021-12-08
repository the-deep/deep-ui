import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Table, {
    Props as TableProps,
    Column,
} from '../Table';

import Message, { Props as MessageProps } from '../Message';
import styles from './styles.css';

type MessagePropOmission = 'className' | 'message'
| 'compact' | 'icon' | 'empty' | 'pendingContainerClassName' | 'messageHidden' | 'messageIconHidden' | 'filtered' | 'pending' | 'errored';

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
    messageShown?: boolean;
    messageIconShown?: boolean;
    errored: boolean;
    filtered: boolean;
    pending: boolean;
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
        errored,
        emptyIcon,
        emptyMessage,
        pendingMessage,
        filteredEmptyIcon,
        filteredEmptyMessage,
        erroredEmptyIcon,
        erroredEmptyMessage,

        data,
        contentClassName,
        compactEmptyMessage,
        compactPendingMessage,
        messageShown = false,
        messageIconShown = false,
        onReload,
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
            <Message
                empty={empty}
                errored={errored}
                pending={pending}
                filtered={filtered}
                emptyIcon={emptyIcon}
                emptyMessage={emptyMessage}
                pendingMessage={pendingMessage}
                filteredEmptyIcon={filteredEmptyIcon}
                filteredEmptyMessage={filteredEmptyMessage}
                erroredEmptyIcon={erroredEmptyIcon}
                erroredEmptyMessage={erroredEmptyMessage}
                compactPendingMessage={compactPendingMessage}
                compactEmptyMessage={compactEmptyMessage}
                messageHidden={!messageShown}
                messageIconHidden={!messageIconShown}
                onReload={onReload}
            />
            {!errored && (
                <Table
                    className={_cs(styles.table, contentClassName)}
                    data={data}
                    {...otherTableProps}
                />
            )}
        </div>
    );
}

export default TableView;
