import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Element from '../Element';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import InputHint from '../InputHint';
import InputBorder from '../InputBorder';
import { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';

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
    error?: string;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    inputSectionRef?: React.RefObject<HTMLDivElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    uiMode?: UiMode;
    filled?: boolean;
    children?: React.ReactNode;
    variant?: 'form' | 'general';
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
        children,
        variant = 'form',
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
                variant === 'general' && styles.forGeneralUse,
            )}
        >
            <InputLabel
                className={labelContainerClassName}
                uiMode={uiMode}
            >
                {label}
            </InputLabel>
            <Element
                elementRef={inputSectionRef}
                className={_cs(styles.inputSection, inputSectionClassName)}
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                actionsContainerClassName={actionsContainerClassName}
                actions={actions}
                childrenContainerClassName={_cs(styles.inputContainer, inputContainerClassName)}
            >
                {input}
            </Element>
            { children }
            <InputBorder
                className={styles.inputSectionBorder}
                errored={!!error}
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

export default InputContainer;
