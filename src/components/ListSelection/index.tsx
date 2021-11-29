import React, { useMemo, useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoClose } from 'react-icons/io5';

import ListView from '../ListView';
import Button, { Props as ButtonProps } from '../Button';

import styles from './styles.css';

type OptionKey = string | number;
type NameType = string | number | undefined;

interface RendererProps<D, K extends NameType> {
    datum: D,
    labelSelector: (datum: D) => string;
    onRemove: ButtonProps<K>['onClick'];
    itemKey: K;
    disabled?: boolean;
    readOnly?: boolean;
    rendererClassName?: string;
}

function ListItem<D, K extends NameType>(props: RendererProps<D, K>) {
    const {
        itemKey,
        datum,
        labelSelector,
        onRemove,
        disabled,
        readOnly,
        rendererClassName,
    } = props;

    const label = labelSelector(datum);

    return (
        <div className={_cs(styles.item, rendererClassName)}>
            {label}
            {!readOnly && (
                <Button
                    className={styles.removeButton}
                    name={itemKey}
                    onClick={onRemove}
                    variant="transparent"
                    disabled={disabled}
                >
                    <IoClose />
                </Button>
            )}
        </div>
    );
}

export interface Props<D, K extends OptionKey, N extends NameType> {
    name: N;
    data: D[] | undefined;
    keySelector: (datum: D) => K;
    labelSelector: (datum: D) => string;
    onChange: (value: K[], name: N) => void;
    value: K[] | undefined;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    rendererClassName?: string;
}

function ListSelection<D, K extends OptionKey, N extends NameType>(props: Props<D, K, N>) {
    const {
        data,
        labelSelector,
        keySelector,
        onChange,
        value,
        name,
        disabled,
        readOnly,
        className,
        rendererClassName,
    } = props;

    const handleItemRemove = useCallback(
        (id: K) => {
            const newData = value?.filter((i) => i !== id);
            onChange(newData ?? [], name);
        },
        [value, onChange, name],
    );

    const rendererParams = useCallback(
        (key, datum) => ({
            datum,
            itemKey: key,
            labelSelector,
            onRemove: handleItemRemove,
            disabled,
            readOnly,
            rendererClassName,
        }),
        [
            rendererClassName,
            disabled,
            readOnly,
            labelSelector,
            handleItemRemove,
        ],
    );
    const selectedValues = useMemo(() => (
        data?.filter((d) => value?.includes(keySelector(d)))
    ), [
        data,
        keySelector,
        value,
    ]);

    return (
        <ListView
            className={_cs(styles.list, className)}
            data={selectedValues}
            keySelector={keySelector}
            renderer={ListItem}
            rendererParams={rendererParams}
        />
    );
}

export default ListSelection;
