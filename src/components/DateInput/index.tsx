import React from 'react';
import { _cs } from '@togglecorp/fujs';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';

import styles from './styles.css';

type InheritedProps<T> = (Omit<InputContainerProps, 'input'> & RawInputProps<T>);
export interface Props<T extends string> extends InheritedProps<T> {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
}

function DateInput<T extends string>(props: Props<T>) {
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
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        inputElementRef,
        containerRef,
        inputSectionRef,
        inputClassName,
        variant,
        ...dateInputProps
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
            variant={variant}
            input={(
                <RawInput<T>
                    {...dateInputProps}
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
                    type="date"
                />
            )}
        />
    );
}

export default DateInput;
