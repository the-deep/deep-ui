import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import ListView from '../ListView';
import Button from '../Button';

import styles from './styles.css';

type NameType = string | number | undefined;

type InheritedProps<T extends NameType> = (Omit<InputContainerProps, 'input'> & RawInputProps<T>);

interface Suggestion {
    id: string;
    title: string;
}

const keySelector = (s: Suggestion) => s.id;

interface SuggestionProps<T extends NameType> {
    name: T;
    inputSuggestions: Suggestion[];
    disabled: boolean | undefined;
    onChange?: RawInputProps<T>['onChange'];
}

function Suggestion<T extends NameType>(props: SuggestionProps<T>) {
    const {
        name,
        onChange,
        inputSuggestions,
        disabled,
    } = props;

    const rendererParams = useCallback((_:string, data: Suggestion) => ({
        name: data.title,
        children: data.title,
        disabled,
        variant: 'secondary' as const,
        onClick: (value: string) => {
            if (onChange) {
                onChange(value, name);
            }
        },
    }), [onChange, name, disabled]);

    return (
        <ListView
            className={styles.suggestions}
            keySelector={keySelector}
            data={inputSuggestions}
            renderer={Button}
            rendererParams={rendererParams}
            filtered={false}
            pending={false}
            errored={false}
        />
    );
}

export interface Props<T extends NameType> extends InheritedProps<T> {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
    inputSuggestions?: Suggestion[];
}

function TextInput<T extends NameType>(props: Props<T>) {
    const {
        name,
        onChange,
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
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        inputElementRef,
        containerRef,
        inputSectionRef,
        inputClassName,
        variant,
        inputSuggestions,
        ...textInputProps
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    return (
        <>
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
                variant={variant}
                input={(
                    <RawInput<T>
                        {...textInputProps}
                        name={name}
                        onChange={onChange}
                        className={_cs(
                            styles.input,
                            uiModeClassName,
                            !!error && styles.errored,
                            inputClassName,
                        )}
                        elementRef={inputElementRef}
                        readOnly={readOnly}
                        uiMode={uiMode}
                        disabled={disabled}
                        type="text"
                    />
                )}
            />
            {(inputSuggestions) && (
                <Suggestion
                    name={name}
                    onChange={onChange}
                    inputSuggestions={inputSuggestions}
                    disabled={disabled || readOnly}
                />
            )}
        </>
    );
}

export default genericMemo(TextInput);
