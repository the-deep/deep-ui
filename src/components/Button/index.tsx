import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';

import styles from './styles.css';

export type ButtonVariant = (
    'primary'
    | 'secondary'
    | 'tertiary'
    | 'action'
    | 'transparent'
    | 'general'
);

const buttonVariantToStyleMap: { [key in ButtonVariant]: string; } = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
    action: styles.action,
    transparent: styles.transparent,
    general: styles.general,
};

export interface Props<N> extends Omit<
    React.HTMLProps<HTMLButtonElement>,
    'ref' | 'onClick' | 'name' | 'type' | 'label'
> {
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    children?: React.ReactNode;
    className?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsClassName?: string;
    childrenClassName?: string;
    actionsClassName?: string;
    disabled?: boolean;
    big?: boolean;
    name: N;
    onClick?: (name: N, e: React.MouseEvent<HTMLButtonElement>) => void;
    readOnly?: boolean;
    elementRef?: React.RefObject<HTMLButtonElement>;
}

export type ButtonFeatureKeys = 'variant' | 'className' | 'actionsClassName' | 'iconsClassName' | 'childrenClassName' | 'children' | 'icons' | 'actions' | 'disabled' | 'big' | 'readOnly';
export function useButtonFeatures(
    props: Pick<Props<void>, ButtonFeatureKeys>,
) {
    const {
        variant = 'primary',
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        disabled,
        children,
        icons,
        actions,
        big,
        readOnly,
    } = props;

    const buttonClassName = _cs(
        styles.button,
        buttonVariantToStyleMap[variant] ?? styles.primary,
        readOnly && styles.readOnly,
        big && styles.big,
        className,
    );

    const buttonChildren = (
        <>
            {icons && (
                <div className={_cs(iconsClassName, styles.icons)}>
                    {icons}
                </div>
            )}
            {children && (
                <div className={_cs(childrenClassName, styles.children)}>
                    {children}
                </div>
            )}
            {actions && (
                <div className={_cs(actionsClassName, styles.actions)}>
                    {actions}
                </div>
            )}
        </>
    );

    return {
        className: buttonClassName,
        children: buttonChildren,
        disabled,
    };
}

function Button<N>(props: Props<N>) {
    const {
        variant,
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        children,
        icons,
        actions,
        disabled,
        big,
        name,
        onClick,
        readOnly,
        elementRef,
        ...otherProps
    } = props;

    const handleButtonClick = React.useCallback((e) => {
        if (onClick && !readOnly) {
            onClick(name, e);
        }
    }, [name, onClick, readOnly]);

    const buttonProps = useButtonFeatures({
        variant,
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        children,
        icons,
        actions,
        disabled,
        big,
        readOnly,
    });

    // FIXME: Use raw button
    return (
        <button
            ref={elementRef}
            type="button"
            onClick={handleButtonClick}
            {...otherProps}
            {...buttonProps}
        />
    );
}

export default genericMemo(Button);
