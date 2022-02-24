import React, { useCallback, useState } from 'react';

import ListView from '../ListView';
import Button, { ButtonVariant } from '../Button';

import styles from './styles.css';

type NameType = string | number | undefined;
type OptionKey = string | number;

export interface Props<O, N extends NameType, K extends OptionKey> {
    name: N;
    value: K,
    options: O[];
    keySelector: (datum: O) => K;
    labelSelector: (datum: O) => string;
    onChange?: (value: K, name: N) => void;
    disabled?: boolean | undefined;
    variant?: ButtonVariant;
}

function Suggestion<O, N extends NameType, K extends OptionKey>(props: Props<O, N, K>) {
    const {
        name,
        onChange,
        options,
        disabled,
        labelSelector,
        keySelector,
        value,
        variant = 'secondary',
    } = props;

    const handleOptionClick = useCallback((key: K) => {
        if (onChange) {
            onChange(key, name);
        }
    }, [
        onChange,
        name,
        value,
    ]);

    const rendererParams = useCallback((_: K, data: O) => ({
        name: keySelector(data),
        children: labelSelector(data),
        disabled,
        variant,
        onClick: handleOptionClick,
    }), [
        variant,
        disabled,
        handleOptionClick,
        keySelector,
        labelSelector,
    ]);

    const filteredOptions = options.filter((option) => keySelector(option) !== value);

    return (
        <ListView
            className={styles.suggestions}
            keySelector={keySelector}
            data={filteredOptions}
            renderer={Button}
            rendererParams={rendererParams}
            filtered={false}
            pending={false}
            errored={false}
        />
    );
}
export default Suggestion;
