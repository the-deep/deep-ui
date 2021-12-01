import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton from '../RawButton';
import RadioInput, { Props as RadioInputProps } from '../RadioInput';
import { Props as RadioProps } from '../RadioInput/Radio';

import styles from './styles.css';

type OptionKey = string | number | undefined;

export interface ScaleProps<V extends OptionKey> extends Omit<RadioProps<V>, 'label'> {
    color?: string;
    label?: string;
}

function Scale<V extends OptionKey>(props: ScaleProps<V>) {
    const {
        label,
        name,
        onClick,
        value,
        className,
        color,
        inputName, // eslint-disable-line @typescript-eslint/no-unused-vars
        disabled,
        ...otherProps
    } = props;

    return (
        <RawButton
            {...otherProps}
            className={_cs(
                styles.scale,
                className,
                disabled && styles.disabled,
            )}
            style={value ? ({
                borderColor: color,
            }) : undefined}
            name={name}
            onClick={onClick}
            title={label}
            disabled={disabled}
        >
            <div
                className={styles.innerCircle}
                style={{
                    backgroundColor: color,
                }}
            />
        </RawButton>
    );
}

interface ExtendedProps<V> extends RadioProps<V> {
    color?: string;
    label?: string;
}

export interface Props<
    N extends OptionKey,
    O,
    V
> extends Omit<RadioInputProps<N, O, V, ExtendedProps<V>>, 'rendererParams' | 'renderer' | 'listContainerClassName' | 'keySelector' | 'labelSelector'> {
    listContainerClassName?: RadioInputProps<N, O, V, ExtendedProps<V>>['listContainerClassName'];
    keySelector: RadioInputProps<N, O, V, ExtendedProps<V>>['keySelector'];
    labelSelector: (option: O) => string;
    colorSelector: (option: O) => string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function ScaleInput<
    N extends OptionKey,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    V extends string | number,
>(props: Props<N, O, V>) {
    const {
        listContainerClassName,
        keySelector,
        labelSelector,
        colorSelector,
        className,
        ...otherProps
    } = props;

    const finalRendererParams = useCallback((option: O) => ({
        color: colorSelector(option),
    }), [colorSelector]);

    return (
        <RadioInput<N, O, V, ExtendedProps<V>>
            {...otherProps}
            className={_cs(className, styles.scaleInput)}
            renderer={Scale}
            spacing="compact"
            rendererParams={finalRendererParams}
            listContainerClassName={_cs(
                listContainerClassName,
                styles.scaleList,
            )}
            keySelector={keySelector}
            labelSelector={labelSelector}
        />
    );
}

export default ScaleInput;
