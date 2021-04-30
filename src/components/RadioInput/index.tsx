import React from 'react';
import { _cs } from '@togglecorp/fujs';

import InputLabel from '../InputLabel';
import InputError from '../InputError';
import InputHint from '../InputHint';
import List from '../List';
import Radio, { Props as RadioProps } from './Radio';

import styles from './styles.css';

export interface Props<N, O> {
    className?: string;
    options: O[];
    name: N;
    value: number | string;
    onChange: (value: number | string, name: N) => void;
    radioKeySelector: (option: O) => string | number;
    radioLabelSelector: (option: O) => React.ReactNode;
    input: React.ReactNode;
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: string;
    labelContainerClassName?: string;
    hintContainerClassName?: string;
    errorContainerClassName?: string;
    radioListContainerClassName?: string;
    disabled?: boolean;
    radioRenderer?: (p: RadioProps<N>) => React.ReactElement;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function RadioInput<N extends string | number, O extends object>(props: Props<N, O>) {
    const {
        className,
        name,
        options,
        value,
        onChange,
        radioKeySelector,
        radioLabelSelector,
        label,
        labelContainerClassName,
        radioListContainerClassName,
        error,
        hint,
        hintContainerClassName,
        errorContainerClassName,
        radioRenderer = Radio,
    } = props;

    const handleRadioClick = React.useCallback((radioKey) => {
        if (onChange) {
            onChange(radioKey, name);
        }
    }, [onChange, name]);

    const radioRendererParams = React.useCallback((key, item) => ({
        key,
        label: radioLabelSelector(item),
        name: key,
        inputName: name,
        value: key === value,
        onClick: handleRadioClick,
    }), [name, radioLabelSelector, value, handleRadioClick]);

    return (
        <div className={_cs(styles.radioInput, className)}>
            <InputLabel className={labelContainerClassName}>
                { label }
            </InputLabel>
            <div className={_cs(styles.radioListContainer, radioListContainerClassName)}>
                <List
                    data={options}
                    rendererParams={radioRendererParams}
                    renderer={radioRenderer}
                    keySelector={radioKeySelector}
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

export default RadioInput;
