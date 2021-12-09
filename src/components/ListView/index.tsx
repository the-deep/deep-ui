import React from 'react';
import { _cs } from '@togglecorp/fujs';

import List, {
    Props as ListProps,
    OptionKey,
    GroupCommonProps,
} from '../List';

import { SpacingTypes } from '../../types';
import Message, { Props as MessageProps } from '../Message';
import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

type MessagePropOmission = 'className' | 'message'
| 'compact' | 'icon' | 'empty' | 'pendingContainerClassName' | 'messageHidden' | 'messageIconHidden' | 'filtered' | 'pending' | 'errored';

export type Props<
    D,
    P,
    K extends OptionKey,
    GP extends GroupCommonProps,
    GK extends OptionKey
> = ListProps<D, P, K, GP, GK> & Omit<MessageProps, MessagePropOmission> & {
    className?: string;
    compactEmptyMessage?: boolean;
    compactAndVerticalEmptyMessage?: boolean;
    compactPendingMessage?: boolean;
    direction?: 'horizontal' | 'vertical';
    messageShown?: boolean;
    messageIconShown?: boolean;
    style?: React.CSSProperties,
    errored: boolean;
    filtered: boolean;
    pending: boolean;
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
        errored,
        filtered,
        emptyIcon,
        emptyMessage,
        pendingMessage,
        filteredEmptyIcon,
        filteredEmptyMessage,
        erroredEmptyIcon,
        erroredEmptyMessage,

        data,
        compactPendingMessage,
        compactEmptyMessage,
        compactAndVerticalEmptyMessage,
        spacing = 'none',
        direction = 'horizontal',
        messageShown = false,
        messageIconShown = false,
        style,
        onReload,
        ...otherListProps
    } = props;

    const empty = !(data?.length && data.length > 0);

    return (
        <div
            className={_cs(
                styles.listView,
                empty && styles.empty,
                pending && styles.pending,
                spacingToStyleMap[spacing],
                direction === 'vertical' && styles.vertical,
                className,
            )}
            style={style}
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
                compact={compactEmptyMessage}
                compactAndVertical={compactAndVerticalEmptyMessage}
                messageHidden={!messageShown}
                messageIconHidden={!messageIconShown}
                onReload={onReload}
            />
            {!errored && (
                <List
                    data={data}
                    spacing={spacing}
                    {...otherListProps}
                />
            )}
        </div>
    );
}

export default ListView;
