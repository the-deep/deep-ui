import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton from '../RawButton';
import RadioInput, { Props as RadioInputProps } from '../RadioInput';
import { Props as RadioProps } from '../RadioInput/Radio';

import styles from './styles.css';

export interface ScaleProps<V extends string | number | undefined> extends Omit<RadioProps<V>, 'label'> {
    color?: string;
    label?: string;
}

function Scale<V extends string | number | undefined>(props: ScaleProps<V>) {
    const {
        label,
        name,
        onClick,
        value,
        className,
        color,
        inputName, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...otherProps
    } = props;

    return (
        <RawButton
            {...otherProps}
            className={_cs(
                styles.scale,
                className,
            )}
            style={value ? ({
                borderColor: color,
            }) : undefined}
            name={name}
            onClick={onClick}
            title={label}
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
    N, O, V
> extends Omit<RadioInputProps<N, O, V, ExtendedProps<V>>, 'radioRendererParams' | 'radioRenderer' | 'radioListContainerClassName' | 'radioKeySelector' | 'radioLabelSelector'> {
    scaleListContainerClassName?: RadioInputProps<N, O, V, ExtendedProps<V>>['radioListContainerClassName'];
    scaleKeySelector: RadioInputProps<N, O, V, ExtendedProps<V>>['radioKeySelector'];
    scaleLabelSelector: (option: O) => string;
    scaleColorSelector: (option: O) => string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function ScaleInput<
    N extends string | number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    V extends string | number,
>(props: Props<N, O, V>) {
    const {
        scaleListContainerClassName,
        scaleKeySelector,
        scaleLabelSelector,
        scaleColorSelector,
        ...otherProps
    } = props;

    const finalRendererParams = useCallback((option: O) => ({
        color: scaleColorSelector(option),
    }), [scaleColorSelector]);

    return (
        <RadioInput<N, O, V, ExtendedProps<V>>
            {...otherProps}
            radioRenderer={Scale}
            radioRendererParams={finalRendererParams}
            radioListContainerClassName={_cs(
                scaleListContainerClassName,
                styles.scaleList,
            )}
            radioKeySelector={scaleKeySelector}
            radioLabelSelector={scaleLabelSelector}
        />
    );
}

export default ScaleInput;
