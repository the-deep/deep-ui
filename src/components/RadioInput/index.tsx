import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import InputHint from '../InputHint';
import List from '../List';
import Radio, { Props as RadioProps } from './Radio';

import { SpacingTypes } from '../../types';
import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

type NameType = string | number | undefined;

export interface Props<N extends NameType, O, V, RRP extends RadioProps<V>> {
    className?: string;
    options: O[] | undefined;
    name: N;
    value: V | null | undefined;
    onChange: (value: V, name: N) => void;
    keySelector: (option: O) => V;
    labelSelector: (option: O) => React.ReactNode;
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: string;
    labelContainerClassName?: string;
    hintContainerClassName?: string;
    errorContainerClassName?: string;
    listContainerClassName?: string;
    disabled?: boolean;
    readOnly?: boolean;
    renderer?: (p: RRP) => React.ReactElement;
    rendererParams?: (o: O) => Omit<RRP, 'inputName' | 'label' | 'name' | 'onClick' | 'value'>;
    spacing?: SpacingTypes;
}

function RadioInput<
    N extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    V extends string | number,
    RRP extends RadioProps<V>,
    >(props: Props<N, O, V, RRP>) {
    const {
        className,
        name,
        options,
        value,
        onChange,
        keySelector,
        labelSelector,
        label,
        labelContainerClassName,
        listContainerClassName,
        error,
        hint,
        hintContainerClassName,
        errorContainerClassName,
        renderer = Radio,
        rendererParams: rendererParamsFromProps,
        disabled,
        readOnly,
        spacing = 'comfortable',
    } = props;

    const handleRadioClick = React.useCallback((radioKey) => {
        if (onChange && !readOnly) {
            onChange(radioKey, name);
        }
    }, [readOnly, onChange, name]);

    const rendererParams: (
        k: V,
        i: O,
    ) => RRP = React.useCallback((key: V, item: O) => {
        // NOTE: this is required becase this is advance usecase
        // and the typings
        const radioProps: Pick<RRP, 'inputName' | 'label' | 'name' | 'onClick' | 'value' | 'disabled' | 'readOnly' | 'spacing'> = {
            inputName: name,
            label: labelSelector(item),
            name: key,
            onClick: handleRadioClick,
            value: key === value,
            disabled,
            readOnly,
            spacing,
        };

        const combinedProps = {
            ...(rendererParamsFromProps ? rendererParamsFromProps(item) : undefined),
            ...radioProps,
        } as RRP;

        return combinedProps;
    }, [
        name,
        labelSelector,
        spacing,
        value,
        handleRadioClick,
        rendererParamsFromProps,
        disabled,
        readOnly,
    ]);

    return (
        <div
            className={_cs(
                styles.radioInput,
                disabled && styles.disabled,
                spacingToStyleMap[spacing],
                className,
            )}
        >
            <InputLabel
                className={labelContainerClassName}
                disabled={disabled}
            >
                {label}
            </InputLabel>
            <div className={_cs(styles.radioListContainer, listContainerClassName)}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <List<O, RadioProps<V> & RRP, V, any, any>
                    data={options}
                    rendererParams={rendererParams}
                    renderer={renderer}
                    keySelector={keySelector}
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

export default genericMemo(RadioInput);
