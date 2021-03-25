import React from 'react';
import { _cs } from '@togglecorp/fujs';

import InputLabel from '#components/InputLabel';
import InputError from '#components/InputError';
import InputBorder from '#components/InputBorder';
import { UiMode } from '#components/UiModeContext';
import useUiModeClassName from '#hooks/useUiModeClassName';

import styles from './styles.css';

export interface Props {
    className?: string;
    labelContainerClassName?: string;
    hintContainerClassName?: string;
    errorContainerClassName?: string;
    inputSectionClassName?: string;
    iconsContainerClassName?: string;
    inputContainerClassName?: string;
    actionsContainerClassName?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    input: React.ReactNode;
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    inputSectionRef?: React.RefObject<HTMLDivElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    uiMode?: UiMode;
    filled?: boolean;
}

function InputContainer(props: Props) {
    const {
        className,
        label,
        labelContainerClassName,
        inputSectionClassName,
        inputContainerClassName,
        icons,
        iconsContainerClassName,
        actions,
        actionsContainerClassName,
        input,
        hintContainerClassName,
        errorContainerClassName,
        disabled,
        readOnly,
        hint,
        error,
        inputSectionRef,
        invalid,
        containerRef,
        uiMode,
        filled,
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    return (
        <div
            ref={containerRef}
            className={_cs(
                className,
                styles.inputContainer,
                uiModeClassName,
                disabled && styles.disabled,
                readOnly && styles.readOnly,
                (invalid || !!error) && styles.errored,
                filled && styles.filled,
            )}
        >
            <InputLabel
                className={_cs(styles.inputLable, labelContainerClassName)}
                uiMode={uiMode}
            >
                {label}
            </InputLabel>
            <div
                ref={inputSectionRef}
                className={_cs(styles.inputSection, inputSectionClassName)}
            >
                {icons && (
                    <div className={_cs(styles.icons, iconsContainerClassName)}>
                        {icons}
                    </div>
                )}
                <div className={_cs(styles.input, inputContainerClassName)}>
                    {input}
                </div>
                {(!readOnly && actions) && (
                    <div className={_cs(styles.actions, actionsContainerClassName)}>
                        {actions}
                    </div>
                )}
                <InputBorder
                    className={styles.inputSectionBorder}
                    errored={!!error}
                />
            </div>
            <InputError className={_cs(styles.error, errorContainerClassName)}>
                {error}
            </InputError>
            {!error && hint && (
                <div className={_cs(styles.hint, hintContainerClassName)}>
                    {hint}
                </div>
            )}
        </div>
    );
}

export default InputContainer;
