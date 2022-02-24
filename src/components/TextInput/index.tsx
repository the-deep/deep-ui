import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';

import styles from './styles.css';

type NameType = string | number | undefined;

type InheritedProps<T extends NameType> = (Omit<InputContainerProps, 'input'> & RawInputProps<T>);

export interface Props<T extends NameType> extends InheritedProps<T> {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
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
        inputDescription,
        variant,
        ...textInputProps
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

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
            inputDescription={inputDescription}
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
    );
}

export default genericMemo(TextInput);
