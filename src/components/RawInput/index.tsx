import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';

import type { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props<N> extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'value' | 'name' | 'label'> {
    /**
    * Style for the input
    */
    className?: string;
    /**
    * input name
    */
    name: N;
    /**
    * input value
    */
    value: string | undefined | null;
    /**
    * Gets called when the content of input changes
    */
    onChange?: (
        value: string | undefined,
        name: N,
        e?: React.FormEvent<HTMLInputElement> | undefined,
    ) => void;
    /**
     * UI mode: light or dark
     */
    uiMode?: UiMode;
    /**
     * ref to the element
     */
    elementRef?: React.Ref<HTMLInputElement>;
}
/**
 * The most basic input component with default stylings removed (without any styling)
 */
function RawInput<N extends string | number>(
    {
        className,
        onChange,
        uiMode,
        elementRef,
        value,
        name,
        ...otherProps
    }: Props<N>,
) {
    const handleChange = React.useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
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

    const themeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    return (
        <input
            ref={elementRef}
            className={_cs(className, styles.rawInput, themeClassName)}
            onChange={handleChange}
            name={isDefined(name) ? String(name) : undefined}
            value={value ?? ''}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default genericMemo(RawInput);
