import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import { UiMode } from '../UiModeContext';

import DefaultCheckmark, { CheckmarkProps } from './Checkmark';

import { SpacingTypes } from '../../types';
import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

type NameType = string | number | undefined;

export interface Props<N extends NameType> {
    className?: string;
    labelContainerClassName?: string;
    checkmark?: (p: CheckmarkProps) => React.ReactElement;
    checkmarkClassName?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    indeterminate?: boolean;
    uiMode?: UiMode;
    tooltip?: string;
    value: boolean | undefined | null;
    onChange: (value: boolean, name: N) => void;
    name: N;
    spacing?: SpacingTypes;
}

function Checkbox<N extends NameType>(props: Props<N>) {
    const {
        label,
        tooltip,
        checkmark: Checkmark = DefaultCheckmark,
        className: classNameFromProps,
        value,
        disabled,
        readOnly,
        onChange,
        checkmarkClassName,
        labelContainerClassName,
        indeterminate,
        uiMode,
        name,
        spacing = 'comfortable',
        ...otherProps
    } = props;

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const v = e.currentTarget.checked;
            onChange(v, name);
        },
        [name, onChange],
    );

    const themeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    const className = _cs(
        styles.checkbox,
        classNameFromProps,
        indeterminate && styles.indeterminate,
        !indeterminate && value && styles.checked,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        spacingToStyleMap[spacing],
        themeClassName,
    );

    return (
        <label // eslint-disable-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
            className={className}
            title={tooltip}
        >
            <Checkmark
                className={_cs(checkmarkClassName, styles.checkmark)}
                value={value ?? false}
                indeterminate={indeterminate}
                uiMode={uiMode}
            />
            <input
                onChange={handleChange}
                className={styles.input}
                type="checkbox"
                checked={value ?? false}
                disabled={disabled || readOnly}
                {...otherProps}
            />
            {label && (
                <div className={_cs(styles.label, labelContainerClassName)}>
                    { label }
                </div>
            )}
        </label>
    );
}

export default genericMemo(Checkbox);
