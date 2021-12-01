import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { Props as ButtonProps } from '../Button';
import RadioInput, { Props as RadioInputProps } from '../RadioInput';
import { Props as RadioProps } from '../RadioInput/Radio';

import styles from './styles.css';

type NameType = string | number | undefined;

// Note: more props can be picked as per requirement
type ExtraSegmentProps = Pick<ButtonProps<undefined>, 'icons' | 'iconsContainerClassName' | 'actions' | 'actionsContainerClassName'>;
export interface SegmentProps<N extends NameType> extends RadioProps<N>, ExtraSegmentProps {
}

function Segment<N extends NameType>(props: SegmentProps<N>) {
    const {
        label,
        name,
        onClick,
        value,
        className,
        inputName, // eslint-disable-line @typescript-eslint/no-unused-vars
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
    N extends NameType,
    O,
    V,
    RRP extends RadioProps<V>,
> extends Omit<RadioInputProps<N, O, V, RRP>, 'rendererParams' | 'renderer' | 'listContainerClassName' | 'keySelector' | 'labelSelector'> {
    rendererParams?: RadioInputProps<N, O, V, RRP>['rendererParams'];
    listContainerClassName?: RadioInputProps<N, O, V, RRP>['listContainerClassName'];
    keySelector: RadioInputProps<N, O, V, RRP>['keySelector'];
    labelSelector: RadioInputProps<N, O, V, RRP>['labelSelector'];
}

// eslint-disable-next-line @typescript-eslint/ban-types
function SegmentInput<
    N extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    V extends string | number,
    RRP extends RadioProps<V>,
>(props: Props<N, O, V, RRP>) {
    const {
        rendererParams,
        listContainerClassName,
        keySelector,
        labelSelector,
        className,
        ...otherProps
    } = props;
    return (
        <RadioInput
            className={_cs(className, styles.segmentInput)}
            {...otherProps}
            renderer={Segment}
            rendererParams={rendererParams}
            listContainerClassName={_cs(listContainerClassName, styles.list)}
            keySelector={keySelector}
            labelSelector={labelSelector}
        />
    );
}

export default SegmentInput;
