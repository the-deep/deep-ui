import React, { useState, useLayoutEffect } from 'react';
import { isDefined, isFalsyString, isTruthyString, bound } from '@togglecorp/fujs';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import { genericMemo } from '../../utils';

function isValidNumericString(val: string) {
    return /^[+-]?\d+(\.\d+)?$/.test(val);
}
function isValidDecimalTrailingZeroString(val: string) {
    return /^[+-]?\d+\.\d*0$/.test(val);
}

type NameType = string | number | undefined;

export type Props<T extends NameType> = Omit<InputContainerProps, 'input'>
    & Omit<RawInputProps<T>, 'onChange' | 'value'>
    & {
        inputElementRef?: React.RefObject<HTMLInputElement>;
        inputClassName?: string;
        value: number | undefined | null;
        onChange?: (
            value: number | undefined,
            name: T,
            e: React.FormEvent<HTMLInputElement> | undefined,
        ) => void;
    };

function NumberInput<T extends NameType>(props: Props<T>) {
    const {
        actions,
        actionsContainerClassName,
        className,
        disabled,
        error,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        icons,
        iconsContainerClassName,
        inputSectionClassName,
        inputElementRef,
        inputClassName,
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        onChange,
        name,
        value,
        variant,
        ...rawInputProps
    } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputSectionRef = React.useRef<HTMLDivElement>(null);

    const [tempValue, setTempValue] = useState<string | undefined>();

    useLayoutEffect(
        () => {
            // NOTE: we don't clear tempValue if it is equal to input value
            // eg. tempValue: 1.00000, value: 1
            setTempValue((val) => (
                isDefined(val) && isValidNumericString(val) && +val === value
                    ? val
                    : undefined
            ));
        },
        [value],
    );

    const handleChange = React.useCallback(
        (
            v: string | undefined,
            n: T,
            event: React.FormEvent<HTMLInputElement> | undefined,
        ) => {
            if (!onChange) {
                return;
            }

            if (isFalsyString(v)) {
                setTempValue(undefined);
                onChange(undefined, n, event);
                return;
            }

            if (!isValidNumericString(v)) {
                setTempValue(v);
                return;
            }

            // NOTE: we set tempValue if it is valid but is a transient state
            // eg. 1.0000 is valid but transient
            setTempValue(
                isValidDecimalTrailingZeroString(v)
                    ? v
                    : undefined,
            );
            const numericValue = bound(
                +v,
                -Number.MAX_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
            );
            onChange(numericValue, n, event);
        },
        [onChange],
    );

    const finalValue = tempValue ?? (isDefined(value) ? String(value) : undefined);

    return (
        <InputContainer
            containerRef={containerRef}
            inputSectionRef={inputSectionRef}
            actions={actions}
            actionsContainerClassName={actionsContainerClassName}
            className={className}
            disabled={disabled}
            error={error}
            errorContainerClassName={errorContainerClassName}
            hint={hint}
            hintContainerClassName={hintContainerClassName}
            icons={icons}
            iconsContainerClassName={iconsContainerClassName}
            inputSectionClassName={inputSectionClassName}
            label={label}
            labelContainerClassName={labelContainerClassName}
            readOnly={readOnly}
            uiMode={uiMode}
            invalid={isTruthyString(tempValue)}
            variant={variant}
            input={(
                <RawInput<T>
                    {...rawInputProps}
                    elementRef={inputElementRef}
                    className={inputClassName}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    onChange={handleChange}
                    name={name}
                    value={finalValue}
                />
            )}
        />
    );
}

export default genericMemo(NumberInput);
