import React from 'react';
import { _cs } from '@togglecorp/fujs';
import TextareaAutosize from 'react-textarea-autosize';

import InputContainer, { Props as InputContainerProps } from '../InputContainer';

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
    elementRef?: React.Ref<HTMLTextAreaElement>;
    minRows?: number;
    maxRows?: number;
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
        minRows = 3,
        maxRows = 10,
        style,
        ...textAreaProps
    } = props;

    const handleInputChange = React.useCallback(
        (e: React.FormEvent<HTMLTextAreaElement>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;

            if (onChange) {
                onChange(
                    v === '' ? undefined : v,
                    name,
                    e,
                );
            }
        },
        [name, onChange],
    );

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
            input={(
                <TextareaAutosize
                    className={styles.rawTextArea}
                    ref={elementRef}
                    readOnly={readOnly}
                    style={style as React.ComponentProps<typeof TextareaAutosize>['style']}
                    disabled={disabled}
                    onChange={handleInputChange}
                    value={value ?? ''}
                    autoComplete="off"
                    minRows={minRows}
                    maxRows={maxRows}
                    {...textAreaProps}
                />
            )}
        />
    );
}

export default TextArea;
