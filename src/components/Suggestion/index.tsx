import React, { useCallback, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';

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
    buttonVariant?: ButtonVariant;
    className?: string;
    buttonClassName?: string;
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
        className,
        buttonClassName,
        buttonVariant = 'tertiary',
    } = props;

    const handleOptionClick = useCallback((key: K) => {
        if (onChange) {
            onChange(key, name);
        }
    }, [
        onChange,
        name,
    ]);

    const rendererParams = useCallback((_: K, data: O) => ({
        name: keySelector(data),
        children: labelSelector(data),
        disabled,
        variant: buttonVariant,
        onClick: handleOptionClick,
        spacing: 'compact' as const,
        className: _cs(buttonClassName, styles.button),
    }), [
        buttonClassName,
        buttonVariant,
        disabled,
        handleOptionClick,
        keySelector,
        labelSelector,
    ]);

    const filteredOptions = useMemo(() => (
        options.filter((option) => keySelector(option) !== value)
    ),
    [
        value,
        options,
        keySelector,
    ]);

    return (
        <ListView
            className={_cs(styles.suggestions, className)}
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
