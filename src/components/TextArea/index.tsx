import React, { useLayoutEffect, useRef } from 'react';
import { _cs } from '@togglecorp/fujs';

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
    elementRef?: React.RefObject<HTMLTextAreaElement>;
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
        autoComplete,
        style,
        ...textAreaProps
    } = props;

    const textAreaContainerRef = useRef<HTMLDivElement>(null);

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

    // NOTE: implemented from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
    useLayoutEffect(
        () => {
            const elem = textAreaContainerRef?.current;
            if (elem) {
                // FIXME: may need to call requestidlecallback
                elem.dataset.replicatedValue = value ?? undefined;
            }
        },
        [value],
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
                <div
                    className={styles.rawTextAreaContainer}
                    ref={textAreaContainerRef}
                >
                    <textarea
                        className={styles.rawTextArea}
                        ref={elementRef}
                        readOnly={readOnly}
                        style={style}
                        disabled={disabled}
                        onChange={handleInputChange}
                        value={value ?? ''}
                        autoComplete={autoComplete}
                        {...textAreaProps}
                    />
                </div>
            )}
        />
    );
}

export default TextArea;
