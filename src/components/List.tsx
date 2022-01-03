import React, { useCallback, useMemo } from 'react';
import { listToGroupList, isNotDefined } from '@togglecorp/fujs';

import Border, { Props as BorderProps } from './Border';
import { genericMemo } from '../utils';
import { SpacingTypes } from '../types';

export type OptionKey = string | number;

const emptyList: unknown[] = [];

export interface GroupCommonProps {
    className?: string;
    children: React.ReactNode;
}

interface BaseProps<D, P, K extends OptionKey> {
    data: D[] | undefined;
    keySelector(datum: D, index: number): K;
    renderer: (props: P) => JSX.Element | null;
    rendererClassName?: string;
    rendererParams: (key: K, datum: D, index: number, data: D[]) => (P | undefined);
    borderBetweenItem?: boolean;
    borderBetweenItemWidth?: BorderProps['width'];
    borderBetweenItemClassName?: string;
    spacing?: SpacingTypes;
}

interface GroupOptions<D, GP, GK extends OptionKey> {
    groupComparator?: (a: GK, b: GK) => number;
    groupKeySelector(datum: D): GK;

    groupRenderer: (props: GP) => JSX.Element | null;
    groupRendererClassName?: string;
    groupRendererParams: (key: GK, index: number, data: D[]) => (Omit<GP, 'children' | 'className'> | undefined);
    grouped: true;
}

interface NoGroupOptions {
    grouped?: false;
}

// eslint-disable-next-line max-len
export type Props<D, P, K extends OptionKey, GP, GK extends OptionKey> = (
    BaseProps<D, P, K> & (GroupOptions<D, GP, GK> | NoGroupOptions)
);

// eslint-disable-next-line max-len
export type GroupedListProps<D, P, K extends OptionKey, GP, GK extends OptionKey> = (
    BaseProps<D, P, K> & GroupOptions<D, GP, GK>
);

function hasGroup<D, P, K extends OptionKey, GP, GK extends OptionKey>(
    props: Props<D, P, K, GP, GK>,
): props is (BaseProps<D, P, K> & GroupOptions<D, GP, GK>) {
    return !!(props as BaseProps<D, P, K> & GroupOptions<D, GP, GK>).grouped;
}

function GroupedList<D, P, K extends OptionKey, GP extends GroupCommonProps, GK extends OptionKey>(
    props: GroupedListProps<D, P, K, GP, GK>,
) {
    const {
        groupKeySelector,
        groupComparator,
        renderer: Renderer,
        groupRenderer: GroupRenderer,
        groupRendererClassName,
        groupRendererParams,
        data: dataFromProps,
        keySelector,
        rendererParams,
        rendererClassName,
        spacing = 'comfortable',
        borderBetweenItem,
        borderBetweenItemWidth = 'thin',
        borderBetweenItemClassName,
    } = props;

    const data = dataFromProps ?? (emptyList as D[]);

    const renderListItem = useCallback((datum: D, i: number) => {
        const key = keySelector(datum, i);
        const extraProps = rendererParams(key, datum, i, data);

        if (isNotDefined(extraProps)) {
            return null;
        }

        return (
            <>
                <Renderer
                    key={key}
                    className={rendererClassName}
                    {...extraProps}
                />
                {borderBetweenItem && data.length > (i + 1) && (
                    <Border
                        inline
                        extendToSpacing
                        spacing={spacing}
                        className={borderBetweenItemClassName}
                        width={borderBetweenItemWidth}
                    />
                )}
            </>
        );
    }, [
        Renderer,
        data,
        keySelector,
        rendererClassName,
        rendererParams,
        borderBetweenItem,
        borderBetweenItemClassName,
        borderBetweenItemWidth,
        spacing,
    ]);

    const renderGroup = (
        groupKey: GK,
        index: number,
        groupData: D[],
        children: React.ReactNode,
    ) => {
        const extraProps = groupRendererParams(groupKey, index, groupData);

        if (isNotDefined(extraProps)) {
            return null;
        }

        const finalProps = {
            ...extraProps,
            className: groupRendererClassName,
            children,
        };

        return (
            <GroupRenderer
                key={groupKey}
                // FIXME: currently typescript is not smart enough to join Omit
                {...finalProps as GP}
            />
        );
    };

    const groups = useMemo(
        () => listToGroupList(data, groupKeySelector),
        [data, groupKeySelector],
    );

    const sortedGroupKeys = useMemo(
        () => {
            const keys = Object.keys(groups) as GK[];
            return keys.sort(groupComparator);
        },
        [groups, groupComparator],
    );

    const children: React.ReactNode[] = sortedGroupKeys.map((groupKey, i) => (
        renderGroup(
            groupKey,
            i,
            groups[groupKey],
            groups[groupKey].map(renderListItem),
        )
    ));

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
}

function List<D, P, K extends OptionKey, GP extends GroupCommonProps, GK extends OptionKey>(
    props: Props<D, P, K, GP, GK>,
) {
    const {
        data: dataFromProps,
        keySelector,
        renderer: Renderer,
        rendererClassName,
        rendererParams,
        spacing = 'comfortable',
        borderBetweenItem,
        borderBetweenItemClassName,
        borderBetweenItemWidth = 'thin',
    } = props;

    const data = dataFromProps ?? (emptyList as D[]);

    const renderListItem = useCallback((datum: D, i: number) => {
        const key = keySelector(datum, i);
        const extraProps = rendererParams(key, datum, i, data);

        if (isNotDefined(extraProps)) {
            return null;
        }

        return (
            <React.Fragment
                key={key}
            >
                <Renderer
                    className={rendererClassName}
                    {...extraProps}
                />
                {borderBetweenItem && data.length > (i + 1) && (
                    <Border
                        inline
                        extendToSpacing
                        spacing={spacing}
                        className={borderBetweenItemClassName}
                        width={borderBetweenItemWidth}
                    />
                )}
            </React.Fragment>
        );
    }, [
        keySelector,
        Renderer,
        rendererClassName,
        rendererParams,
        data,
        spacing,
        borderBetweenItem,
        borderBetweenItemWidth,
        borderBetweenItemClassName,
    ]);

    if (!hasGroup(props)) {
        return (
            <>
                {data.map(renderListItem)}
            </>
        );
    }

    return (
        <GroupedList
            {...props}
        />
    );
}

export default genericMemo(List);
