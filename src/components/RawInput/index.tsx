import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';

import useDebouncingTextChange from '../../hooks/useDebouncingTextChange';
import type { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import { genericMemo } from '../../utils';

import styles from './styles.css';

type NameType = string | number | undefined;

export interface Props<N extends NameType> extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'value' | 'name' | 'label'> {
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
    autoComplete?: string;
}
/**
 * The most basic input component with default stylings removed (without any styling)
 */
function RawInput<N extends NameType>(
    {
        className,
        onChange,
        uiMode,
        elementRef,
        value,
        name,
        autoComplete = 'off',
        ...otherProps
    }: Props<N>,
) {
    const {
        value: immediateValue,
        onInputChange: handleInputChange,
        onInputBlur: handleInputBlur,
    } = useDebouncingTextChange({
        name,
        value,
        onChange,
    });

    const themeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    return (
        <input
            ref={elementRef}
            className={_cs(className, styles.rawInput, themeClassName)}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={immediateValue ?? ''}
            name={isDefined(name) ? String(name) : undefined}
            autoComplete={autoComplete}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default genericMemo(RawInput);
