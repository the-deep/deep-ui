import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';
import {
    IoRadioButtonOn,
    IoRadioButtonOff,
} from 'react-icons/io5';

import { genericMemo } from '../../../utils';
import { SpacingTypes } from '../../../types';
import InputElementFragments from '../../InputElementFragments';

import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

export interface Props<N> {
    className?: string;
    inputName?: string | number;
    label?: React.ReactNode;
    name: N;
    onClick: (name: N) => void;
    value: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    spacing?: SpacingTypes;
}

function Radio<N extends string | number>(props: Props<N>) {
    const {
        name,
        label,
        className,
        value,
        inputName,
        onClick,
        disabled,
        readOnly,
        spacing = 'comfortable',
    } = props;

    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(name);
        }
    }, [name, onClick]);

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
        <label
            className={_cs(
                styles.radio,
                value && styles.active,
                className,
                disabled && styles.disabled,
                readOnly && styles.readOnly,
                spacingToStyleMap[spacing],
            )}
        >
            <InputElementFragments
                icons={value ? (
                    <IoRadioButtonOn className={styles.icon} />
                ) : (
                    <IoRadioButtonOff className={styles.icon} />
                )}
            >
                {label}
            </InputElementFragments>
            <input
                className={styles.input}
                type="radio"
                name={isDefined(inputName) ? String(inputName) : undefined}
                checked={value}
                onClick={handleClick}
                disabled={disabled}
            />
        </label>
    );
}

export default genericMemo(Radio);
