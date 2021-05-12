import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props<N extends number | string | undefined> extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'onClick' | 'name'>{
    /**
    * Style for the button
    */
    className?: string;
    /**
    * Gets called when user clicks on the button
    */
    onClick?: (name: N, e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Type of the button
     */
    type?: 'button' | 'submit' | 'reset';
    uiMode?: UiMode;
    name: N;
    elementRef?: React.Ref<HTMLButtonElement>;
    focused?: boolean;
}

/**
 * The most basic button component (without styles)
 * This component is meant to be a builder component
 * and comes only with the functionality of button but no
 * styling. Since, `button` element in html has browser and OS dependent styling,
 * we use raw button as a base component for other types of buttons or
 * clickable elements
 */
function RawButton<N extends number | string | undefined>(props: Props<N>) {
    const {
        className,
        onClick,
        uiMode,
        children,
        disabled,
        elementRef,
        name,
        focused,
        ...otherProps
    } = props;

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(name, e);
            }
        },
        [onClick, name],
    );

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);
    return (
        <button
            ref={elementRef}
            type="button"
            className={_cs(
                styles.rawButton,
                focused && styles.focused,
                uiModeClassName,
                className,
            )}
            disabled={disabled}
            onClick={onClick ? handleClick : undefined}
            name={name as string}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        >
            { children }
        </button>
    );
}

export default genericMemo(RawButton);
