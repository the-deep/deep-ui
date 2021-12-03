import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ListView, { Props as ListViewProps } from '../ListView';
import {
    OptionKey,
    GroupCommonProps,
} from '../List';

import styles from './styles.css';

export type Props<D, P, K extends OptionKey> = {
    itemHeight: number;
    elementRef?: React.RefObject<HTMLDivElement>;
    buffer?: number;
    scrollToItemKey?: K;
} & ListViewProps<D, P, K, GroupCommonProps, OptionKey>

function VirtualizedListView<D, P, K extends OptionKey>(props: Props<D, P, K>) {
    const {
        className,
        itemHeight = 16,
        elementRef: elementRefFromProps,
        data = [],
        buffer = 1,
        pending,
        scrollToItemKey,
        keySelector,
        ...otherProps
    } = props;

    const [scrollOffset, setScrollOffset] = React.useState<number | undefined>(undefined);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const elementRef = elementRefFromProps ?? internalRef;
    const idleCallbackRef = React.useRef<number | undefined>();

    React.useEffect(() => {
        const itemIndex = data.findIndex((d, i) => (keySelector(d, i) === scrollToItemKey));
        if (elementRef.current) {
            elementRef.current.scrollTop = itemIndex * itemHeight;
        }
    }, [scrollToItemKey, data, keySelector, itemHeight, elementRef]);

    const setScrollOffsetFromElement = React.useCallback(() => {
        if (idleCallbackRef.current) {
            window.cancelIdleCallback(idleCallbackRef.current);
        }

        idleCallbackRef.current = window.requestIdleCallback(() => {
            if (elementRef.current) {
                setScrollOffset(elementRef.current.scrollTop);
            }
        }, { timeout: 200 });
    }, [elementRef]);

    const [
        renderData,
        topDummyHeight,
        bottomDummyHeight,
    ] = React.useMemo(() => {
        if (
            !elementRef.current
            || !data
            || data.length === 0
            || data.length <= (2 * buffer)
        ) {
            return [data, 0, 0];
        }

        const containerHeight = elementRef.current.getBoundingClientRect().height;
        const startIndex = Math.max(0, (Math.floor((scrollOffset ?? 0) / itemHeight) - buffer));
        const endIndex = Math.min(
            data.length,
            startIndex + Math.ceil(containerHeight / itemHeight) + 2 * buffer,
        );

        return [
            [...data].slice(startIndex, endIndex),
            startIndex * itemHeight,
            (data.length - endIndex) * itemHeight,
        ];
    }, [data, itemHeight, scrollOffset, elementRef, buffer]);

    const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (e.target !== elementRef.current) {
            return;
        }

        setScrollOffsetFromElement();
    }, [setScrollOffsetFromElement, elementRef]);

    React.useEffect(setScrollOffsetFromElement, [setScrollOffsetFromElement]);

    const totalHeight = itemHeight * data.length;
    const listViewHeight = totalHeight - topDummyHeight - bottomDummyHeight;

    return (
        <div
            ref={elementRef}
            className={_cs(styles.virtualizedListView, className)}
            onScroll={handleScroll}
        >
            <div style={{ height: `${totalHeight}px` }}>
                <ListView
                    {...otherProps}
                    data={renderData}
                    pending={pending}
                    direction="vertical"
                    keySelector={keySelector}
                    style={{
                        height: `${listViewHeight}px`,
                        transform: `translateY(${topDummyHeight}px)`,
                    }}
                />
            </div>
        </div>
    );
}

export default VirtualizedListView;
