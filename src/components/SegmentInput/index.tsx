import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { Props as ButtonProps } from '../Button';
import RadioInput, { Props as RadioInputProps } from '../RadioInput';
import { Props as RadioProps } from '../RadioInput/Radio';

import styles from './styles.css';

// Note: more props can be picked as per requirement
type ExtraSegmentProps = Pick<ButtonProps<undefined>, 'icons' | 'iconsClassName' | 'actions' | 'actionsClassName'>;
export interface SegmentProps<N> extends RadioProps<N>, ExtraSegmentProps {
}

function Segment<N>(props: SegmentProps<N>) {
    const {
        label,
        name,
        onClick,
        value,
        className,
        ...otherProps
    } = props;

    return (
        <Button
            {...otherProps}
            className={_cs(styles.segment, className)}
            name={name}
            onClick={onClick}
            variant={value ? 'primary' : 'secondary'}
        >
            { label }
        </Button>
    );
}

export interface Props<
    N, O, V, RRP extends RadioProps<V>
> extends Omit<RadioInputProps<N, O, V, RRP>, 'radioRendererParams' | 'radioRenderer' | 'radioListContainerClassName'> {
    segmentRendererParams: RadioInputProps<N, O, V, RRP>['radioRendererParams'];
    segmentListContainerClassName: RadioInputProps<N, O, V, RRP>['radioListContainerClassName'];
}

// eslint-disable-next-line @typescript-eslint/ban-types
function SegmentInput<
    N extends string | number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    V extends string | number,
    RRP extends RadioProps<V>,
>(props: Props<N, O, V, RRP>) {
    const {
        segmentRendererParams,
        segmentListContainerClassName,
        ...otherProps
    } = props;
    return (
        <RadioInput
            {...otherProps}
            radioRenderer={Segment}
            radioRendererParams={segmentRendererParams}
            radioListContainerClassName={segmentListContainerClassName}
        />
    );
}

export default SegmentInput;
