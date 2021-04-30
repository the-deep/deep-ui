import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button from '../Button';
import RadioInput, { Props as RadioInputProps } from '../RadioInput';
import { Props as RadioProps } from '../RadioInput/Radio';

import styles from './styles.css';

function Segment<N>(props: RadioProps<N>) {
    const {
        label,
        name,
        onClick,
        value,
        className,
    } = props;

    return (
        <Button
            className={_cs(styles.segment, className)}
            name={name}
            onClick={onClick}
            variant={value ? 'primary' : 'secondary'}
        >
            { label }
        </Button>
    );
}

export interface Props<N, O> extends RadioInputProps<N, O> {
}

// eslint-disable-next-line @typescript-eslint/ban-types
function SegmentInput<N extends string | number, O extends object>(props: Props<N, O>) {
    return (
        <RadioInput
            {...props}
            radioRenderer={Segment}
        />
    );
}

export default SegmentInput;
