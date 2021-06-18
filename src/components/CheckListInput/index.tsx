import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../UiModeContext';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import InputHint from '../InputHint';
import List from '../List';
import Checkbox from '../Checkbox';

import styles from './styles.css';

type OptionKey = string | number;

export interface Props<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
> {
    value: T[] | undefined | null;
    options: O[] | undefined;
    onChange: (newValue: T[], name: K) => void;
    keySelector: (option: O) => T;
    labelSelector: (option: O) => string;
    name: K;
    uiMode: UiMode;
    className?: string;
    checkboxLabelContainerClassName?: string;
    checkboxClassName?: string;
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: string;
    labelContainerClassName?: string;
    hintContainerClassName?: string;
    errorContainerClassName?: string;
    listContainerClassName?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

function CheckListInput<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
>(props: Props<T, K, O>) {
    const {
        className,
        disabled,
        error,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        name,
        value,
        options,
        onChange,
        keySelector,
        labelSelector,
        checkboxClassName,
        listContainerClassName,
    } = props;

    const handleCheck = useCallback((isSelected: boolean, key: T) => {
        if (isSelected) {
            onChange([...(value ?? []), key], name);
        } else {
            onChange([...(value ?? []).filter((v) => v !== key)], name);
        }
    }, [value, onChange, name]);

    const optionListRendererParams = useCallback((key: T, data: O) => ({
        name: key,
        value: (value ?? []).some((v) => v === key),
        onChange: handleCheck,
        label: labelSelector(data),
        uiMode,
        disabled,
        readOnly,
    }), [
        value,
        handleCheck,
        labelSelector,
        uiMode,
        disabled,
        readOnly,
    ]);

    return (
        <div
            className={_cs(
                styles.checkListInput,
                className,
            )}
        >
            <InputLabel
                className={labelContainerClassName}
                disabled={disabled}
            >
                { label }
            </InputLabel>
            <div className={_cs(styles.checkListContainer, listContainerClassName)}>
                <List
                    data={options}
                    keySelector={keySelector}
                    renderer={Checkbox}
                    rendererParams={optionListRendererParams}
                    rendererClassName={checkboxClassName}
                />
            </div>
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

export default CheckListInput;
