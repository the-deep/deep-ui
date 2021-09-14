import React from 'react';
import { _cs } from '@togglecorp/fujs';

import List, {
    Props as ListProps,
    OptionKey,
    GroupCommonProps,
} from '../List';

import Message, { Props as MessageProps } from '../Message';
import styles from './styles.css';

type MessagePropOmission = 'className' | 'message' | 'compact' | 'icon' | 'empty' | 'pendingContainerClassName';
export type Props<
    D,
    P,
    K extends OptionKey,
    GP extends GroupCommonProps,
    GK extends OptionKey
> = ListProps<D, P, K, GP, GK> & Omit<MessageProps, MessagePropOmission> & {
    className?: string;
    compactEmptyMessage?: boolean;
    compactPendingMessage?: boolean;
};

function ListView<
    D,
    P,
    K extends OptionKey,
    GP extends GroupCommonProps,
    GK extends OptionKey,
>(props: Props<D, P, K, GP, GK>) {
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
        compactPendingMessage,
        compactEmptyMessage,
        ...otherListProps
    } = props;

    const empty = !(data?.length && data.length > 0);

    return (
        <div
            className={_cs(
                styles.listView,
                className,
                empty && styles.empty,
                pending && styles.pending,
            )}
        >
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
            <List
                data={data}
                {...otherListProps}
            />
        </div>
    );
}

export default ListView;
