import React, { useMemo, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

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
}

function ListItem<D, K extends NameType>(props: RendererProps<D, K>) {
    const {
        itemKey,
        datum,
        labelSelector,
        onRemove,
    } = props;

    const label = labelSelector(datum);

    return (
        <div className={styles.item}>
            {label}
            <div className={styles.button}>
                <Button
                    name={itemKey}
                    onClick={onRemove}
                    variant ="transparent"
                >
                    <IoClose />
                </Button>
            </div>
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
}

function ListSelection<D, K extends OptionKey, N extends NameType>(props: Props<D, K, N>) {
    const {
        data,
        labelSelector,
        keySelector,
        onChange,
        value,
        name,
    } = props;

    const handleItemRemove = useCallback(
        (id: K) => {
            const newData = value?.filter((i) => i !== id);
            onChange(newData ?? [], name);
        },
        [value],
    );

    const rendererParams = useCallback(
        (key, datum) => ({
            datum,
            itemKey: key,
            labelSelector,
            onRemove: handleItemRemove,
        }),
        [
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
            className={styles.list}
            data={selectedValues}
            keySelector={keySelector}
            renderer={ListItem}
            rendererParams={rendererParams}
        />
    );
}
export default ListSelection;
