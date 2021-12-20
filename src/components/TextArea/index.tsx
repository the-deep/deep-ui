import React from 'react';
import { _cs } from '@togglecorp/fujs';

import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import useDebouncingTextChange from '../../hooks/useDebouncingTextChange';

import AutoSizeTextArea from '../AutoSizeTextArea';
import styles from './styles.css';

interface RawTextAreaProps<K> extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref' | 'onChange' | 'value' | 'name' | 'label'> {
    className?: string;
    name: K;
    value: string | undefined | null;
    onChange?: (
        value: string | undefined,
        name: K,
        e: React.FormEvent<HTMLTextAreaElement>,
    ) => void;
    elementRef?: React.RefObject<HTMLTextAreaElement>;
    autoSize?: boolean;
    autoComplete?: string;
}
export type Props<T> = Omit<InputContainerProps, 'input'> & RawTextAreaProps<T>;

function TextArea<T extends string>(props: Props<T>) {
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
        onChange,
        name,
        value,
        containerRef,
        elementRef,
        style,
        autoSize,
        autoComplete = 'off',
        ...textAreaProps
    } = props;

    const {
        value: immediateValue,
        onInputChange: handleInputChange,
        onInputBlur: handleInputBlur,
    } = useDebouncingTextChange({
        name,
        value,
        onChange,
    });

    return (
        <InputContainer
            actions={actions}
            actionsContainerClassName={actionsContainerClassName}
            className={_cs(styles.textArea, className)}
            disabled={disabled}
            error={error}
            errorContainerClassName={errorContainerClassName}
            hint={hint}
            hintContainerClassName={hintContainerClassName}
            icons={icons}
            iconsContainerClassName={iconsContainerClassName}
            inputSectionClassName={_cs(styles.inputSection, inputSectionClassName)}
            label={label}
            labelContainerClassName={labelContainerClassName}
            readOnly={readOnly}
            containerRef={containerRef}
            input={autoSize ? (
                <AutoSizeTextArea
                    className={styles.rawTextArea}
                    elementRef={elementRef}
                    readOnly={readOnly}
                    style={style}
                    disabled={disabled}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    value={immediateValue ?? ''}
                    autoComplete={autoComplete}
                    {...textAreaProps}
                />
            ) : (
                <textarea
                    className={styles.rawTextArea}
                    ref={elementRef}
                    readOnly={readOnly}
                    style={style}
                    disabled={disabled}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    value={immediateValue ?? ''}
                    autoComplete={autoComplete}
                    {...textAreaProps}
                />
            )}
        />
    );
}

export default TextArea;
