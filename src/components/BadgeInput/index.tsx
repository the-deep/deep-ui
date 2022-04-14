import React, { useCallback, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';

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
    value: K | null | undefined;
    options: O[] | null | undefined;
    keySelector: (datum: O) => K;
    labelSelector: (datum: O) => string;
    onChange?: (value: K | undefined, name: N) => void;
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
    suggestionMode?: boolean;
    smallButtons?: boolean;
}

function BadgeInput<O, N extends NameType, K extends OptionKey>(props: Props<O, N, K>) {
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
        suggestionMode,
        smallButtons,
    } = props;

    const handleOptionClick = useCallback((key: K) => {
        if (onChange) {
            onChange(value === key ? undefined : key, name);
        }
    }, [
        value,
        onChange,
        name,
    ]);

    const rendererParams = useCallback((key: K, data: O) => ({
        name: keySelector(data),
        children: labelSelector(data),
        disabled,
        variant: value === key ? selectedButtonVariant : buttonVariant,
        onClick: handleOptionClick,
        spacing: smallButtons ? 'compact' as const : undefined,
        className: _cs(
            buttonClassName,
            styles.button,
            smallButtons && styles.smallButton,
        ),
    }), [
        smallButtons,
        value,
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
            ? options?.filter((option) => keySelector(option) !== value)
            : options
    ),
    [
        selectedValueHidden,
        value,
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
            {!suggestionMode && (
                <InputError className={errorContainerClassName}>
                    {error}
                </InputError>
            )}
            {!suggestionMode && !error && hint && (
                <InputHint className={hintContainerClassName}>
                    {hint}
                </InputHint>
            )}
        </div>
    );
}
export default BadgeInput;
