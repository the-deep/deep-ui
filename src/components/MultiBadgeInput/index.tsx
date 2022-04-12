import React, { useCallback, useMemo } from 'react';
import {
    _cs,
    listToMap,
} from '@togglecorp/fujs';

import ListView from '../ListView';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import InputHint from '../InputHint';
import Button, { ButtonVariant } from '../Button';

import styles from './styles.css';

type NameType = string | number | undefined;
type OptionKey = string | number;

export interface Props<O, N extends NameType, K extends OptionKey> {
    name: N;
    value: K[] | null | undefined;
    options: O[];
    keySelector: (datum: O) => K;
    labelSelector: (datum: O) => string;
    onChange?: (value: K[] | undefined, name: N) => void;
    disabled?: boolean | undefined;
    selectedButtonVariant?: ButtonVariant;
    buttonVariant?: ButtonVariant;
    listClassName?: string;
    buttonClassName?: string;
    containerClassName?: string;
    labelClassName?: string;
    selectedValueHidden?: boolean;
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: string;
    labelContainerClassName?: string;
    hintContainerClassName?: string;
    errorContainerClassName?: string;
    listContainerClassName?: string;
}

function MultiBadgeInput<O, N extends NameType, K extends OptionKey>(props: Props<O, N, K>) {
    const {
        name,
        onChange,
        options,
        disabled,
        labelSelector,
        keySelector,
        value,
        listClassName,
        containerClassName,
        labelContainerClassName,
        errorContainerClassName,
        hintContainerClassName,
        buttonClassName,
        buttonVariant = 'tertiary',
        selectedButtonVariant = 'primary',
        label,
        error,
        hint,
        selectedValueHidden,
    } = props;

    const handleOptionClick = useCallback((key: K) => {
        if (!onChange) {
            return;
        }
        if (!value) {
            onChange([key], name);
            return;
        }

        if (value?.findIndex((val) => val === key) === -1) {
            onChange([...value, key], name);
        } else {
            const newVal = value?.filter((val) => val !== key);
            onChange(newVal?.length > 0 ? newVal : undefined, name);
        }
    }, [
        value,
        onChange,
        name,
    ]);

    const valueMap = useMemo(() => (
        listToMap(
            value,
            (d) => d,
            () => true,
        )
    ), [value]);

    const rendererParams = useCallback((key: K, data: O) => ({
        name: keySelector(data),
        children: labelSelector(data),
        disabled,
        variant: valueMap?.[key] ? selectedButtonVariant : buttonVariant,
        onClick: handleOptionClick,
        spacing: 'compact' as const,
        className: _cs(buttonClassName, styles.button),
    }), [
        valueMap,
        selectedButtonVariant,
        buttonClassName,
        buttonVariant,
        disabled,
        handleOptionClick,
        keySelector,
        labelSelector,
    ]);

    const filteredOptions = useMemo(() => (
        selectedValueHidden
            ? options.filter((option) => !valueMap?.[keySelector(option)])
            : options
    ),
    [
        selectedValueHidden,
        valueMap,
        options,
        keySelector,
    ]);

    return (
        <div className={_cs(styles.container, containerClassName)}>
            <InputLabel
                className={labelContainerClassName}
                disabled={disabled}
            >
                {label}
            </InputLabel>
            <ListView
                className={_cs(styles.suggestions, listClassName)}
                keySelector={keySelector}
                data={filteredOptions}
                renderer={Button}
                rendererParams={rendererParams}
                filtered={false}
                pending={false}
                errored={false}
            />
            <InputError className={errorContainerClassName}>
                {error}
            </InputError>
            {!error && hint && (
                <InputHint className={hintContainerClassName}>
                    {hint}
                </InputHint>
            )}
        </div>
    );
}
export default MultiBadgeInput;
