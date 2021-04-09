import React, { useCallback, useRef } from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton from '../RawButton';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface ContentBaseProps {
    containerClassName?: string;
    title?: string;
}
export type OptionKey = string | number;

export interface GenericOptionParams<P extends ContentBaseProps, OK extends OptionKey, O> {
    optionContainerClassName?: string;
    contentRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName' | 'title'>>) => React.ReactNode;
    contentRendererParam: (key: OK, opt: O) => P;
    option: O;
    optionKey: OK;
    onClick: (optionKey: OK, option: O) => void;
    focusedKey?: OK | undefined;
    onFocus?: (optionKey: OK) => void;
}
function GenericOption<P extends ContentBaseProps, OK extends OptionKey, O>({
    optionContainerClassName,
    contentRenderer,
    contentRendererParam,
    option,
    onClick,
    onFocus,
    optionKey,
    focusedKey,
}: GenericOptionParams<P, OK, O>) {
    const params = contentRendererParam(optionKey, option);
    const {
        containerClassName,
        title,
        ...props
    } = params;

    const isFocused = focusedKey === optionKey;

    const focusedByMouse = useRef(false);

    const handleClick = useCallback(
        () => {
            onClick(optionKey, option);
        },
        [optionKey, option, onClick],
    );

    const handleMouseMove = useCallback(
        () => {
            focusedByMouse.current = true;
            if (onFocus) {
                onFocus(optionKey);
            }
        },
        [
            onFocus,
            optionKey,
        ],
    );

    const handleMouseLeave = useCallback(
        () => {
            focusedByMouse.current = false;
        },
        [],
    );

    return (
        <RawButton
            className={_cs(
                styles.optionRenderer,
                optionContainerClassName,
                containerClassName,
                isFocused && !focusedByMouse.current && styles.focused,
            )}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            title={title}
            name={optionKey}
        >
            {contentRenderer(props)}
        </RawButton>
    );
}
export default genericMemo(GenericOption);
