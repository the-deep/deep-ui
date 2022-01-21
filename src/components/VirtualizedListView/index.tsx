import React, { useEffect, useCallback, useMemo } from 'react';
import { _cs, isNotDefined, bound } from '@togglecorp/fujs';

import ListView, { Props as ListViewProps } from '../ListView';
import {
    OptionKey,
    GroupCommonProps,
} from '../List';
import useSizeTracking from '../../hooks/useSizeTracking';
import { genericMemo } from '../../utils';

import styles from './styles.css';

const emptyList: unknown[] = [];

export type Props<D, P, K extends OptionKey> = {
    itemHeight: number;
    elementRef?: React.RefObject<HTMLDivElement>;
    buffer?: number;
} & ListViewProps<D, P, K, GroupCommonProps, OptionKey>

function VirtualizedListView<D, P, K extends OptionKey>(props: Props<D, P, K>) {
    const {
        className,
        itemHeight = 16,
        elementRef: elementRefFromProps,
        data: dataFromProps,
        buffer = 1,
        pending,
        keySelector,
        reverse,
        ...otherProps
    } = props;

    const data = dataFromProps ?? (emptyList as D[]);

    const [scrollOffset, setScrollOffset] = React.useState<number | undefined>(undefined);

    const internalRef = React.useRef<HTMLDivElement>(null);
    const elementRef = elementRefFromProps ?? internalRef;
    const idleCallbackRef = React.useRef<number | undefined>();

    const size = useSizeTracking(elementRef);
    const height = size?.height;

    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            if (e.target !== elementRef.current) {
                return;
            }

            if (idleCallbackRef.current) {
                window.cancelIdleCallback(idleCallbackRef.current);
            }

            idleCallbackRef.current = window.requestIdleCallback(() => {
                if (elementRef.current) {
                    setScrollOffset(elementRef.current.scrollTop);
                }
            }, { timeout: 200 });
        },
        [elementRef],
    );

    // Initially set scroll offset
    useEffect(
        () => {
            if (elementRef.current) {
                setScrollOffset(elementRef.current.scrollTop);
            }
        },
        [elementRef],
    );

    const [
        renderData,
        topDummyHeight,
        bottomDummyHeight,
        offset,
    ] = useMemo(() => {
        if (data.length <= 2 * buffer) {
            // NOTE: we do not need to set offset because this is a case
            // without virtualization
            return [data, 0, 0, 0];
        }

        if (isNotDefined(height)) {
            return [[], 0, 0, 0];
        }

        const containerHeight = height;

        const startIndex = bound(
            Math.floor((scrollOffset ?? 0) / itemHeight) - buffer,
            0,
            data.length - 1,
        );

        const endIndex = bound(
            startIndex + Math.ceil(containerHeight / itemHeight) + 2 * buffer,
            0,
            data.length - 1,
        );

        const topHeight = startIndex * itemHeight;
        const bottomHeight = (data.length - 1 - endIndex) * itemHeight;

        const actualStartIndex = reverse ? data.length - 1 - endIndex : startIndex;
        const actualEndIndex = reverse ? data.length - 1 - startIndex : endIndex;

        return [
            data.slice(
                actualStartIndex,
                actualEndIndex + 1,
            ),

            topHeight,
            bottomHeight,

            actualStartIndex,
        ];
    }, [data, itemHeight, scrollOffset, buffer, height, reverse]);

    const totalHeight = itemHeight * data.length;
    const listViewHeight = totalHeight - topDummyHeight - bottomDummyHeight;

    const wrapperContainerStyle = useMemo(
        () => ({
            height: `${totalHeight}px`,
        }),
        [totalHeight],
    );

    const listViewStyle = useMemo(
        () => ({
            height: `${listViewHeight}px`,
            transform: `translateY(${topDummyHeight}px)`,
        }),
        [listViewHeight, topDummyHeight],
    );

    return (
        <div
            ref={elementRef}
            className={_cs(styles.virtualizedListView, className)}
            onScroll={handleScroll}
        >
            <div style={wrapperContainerStyle}>
                <ListView
                    {...otherProps}
                    grouped={false}
                    reverse={reverse}
                    indexOffset={offset}
                    data={renderData}
                    pending={pending || (data.length > 0 && renderData.length <= 0)}
                    direction="vertical"
                    keySelector={keySelector}
                    style={listViewStyle}
                />
            </div>
        </div>
    );
}

export default genericMemo(VirtualizedListView);
